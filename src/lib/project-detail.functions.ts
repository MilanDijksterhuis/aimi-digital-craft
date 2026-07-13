import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ADMIN_LIKE_ROLES = ["super_admin", "co_admin", "admin"];
const STAFF_ROLES_SRV = ["super_admin", "co_admin", "support_agent", "viewer", "admin"];

async function getRoles(supabase: any, userId: string): Promise<string[]> {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  return (data ?? []).map((r: any) => r.role);
}

async function isStaff(supabase: any, userId: string) {
  const roles = await getRoles(supabase, userId);
  return roles.some((r) => STAFF_ROLES_SRV.includes(r));
}

async function ensureAdmin(supabase: any, userId: string) {
  const roles = await getRoles(supabase, userId);
  if (!roles.some((r) => ADMIN_LIKE_ROLES.includes(r))) {
    throw new Error("Forbidden: admin only");
  }
}

async function ensureProjectAccess(supabase: any, userId: string, projectId: string) {
  const staff = await isStaff(supabase, userId);
  if (staff) return { staff: true };
  const { data: member } = await supabaseAdmin
    .from("project_members" as any)
    .select("project_id")
    .eq("project_id", projectId)
    .eq("user_id", userId)
    .maybeSingle();
  if (!member) throw new Error("Forbidden: geen toegang tot dit project");
  return { staff: false };
}

async function logActivity(
  projectId: string,
  userId: string,
  actionType: string,
  description: string,
) {
  await supabaseAdmin.from("project_activity_log" as any).insert({
    project_id: projectId,
    user_id: userId,
    action_type: actionType,
    description,
  });
}

// ---------- Detail ophalen ----------

export const getProjectDetail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const { staff } = await ensureProjectAccess(supabase, userId, data.project_id);

    const [projectRes, membersRes, milestonesRes, activityRes, notesRes, contactsRes] = await Promise.all([
      supabaseAdmin.from("projects" as any).select("*").eq("id", data.project_id).maybeSingle(),
      supabaseAdmin.from("project_members" as any).select("user_id").eq("project_id", data.project_id),
      supabaseAdmin.from("project_milestones" as any).select("*").eq("project_id", data.project_id).order("order", { ascending: true }),
      supabaseAdmin.from("project_activity_log" as any).select("*").eq("project_id", data.project_id).order("created_at", { ascending: false }).limit(100),
      supabaseAdmin.from("project_notes" as any).select("*").eq("project_id", data.project_id).order("created_at", { ascending: false }),
      supabaseAdmin.from("project_contacts" as any).select("*").eq("project_id", data.project_id).order("created_at", { ascending: true }),
    ]);

    if (!projectRes.data) throw new Error("Project niet gevonden");

    const memberIds = (membersRes.data ?? []).map((m: any) => m.user_id);
    const { data: profiles } = memberIds.length
      ? await supabase.from("profiles").select("id, full_name, email").in("id", memberIds)
      : { data: [] };

    const notes = (notesRes.data ?? []) as any[];
    const project = projectRes.data as any;

    return {
      isStaff: staff,
      project: staff
        ? project
        : { ...project, internal_notes: undefined },
      members: profiles ?? [],
      milestones: milestonesRes.data ?? [],
      activity: activityRes.data ?? [],
      notes: staff ? notes : notes.filter((n) => n.is_client_visible),
      contacts: contactsRes.data ?? [],
    };
  });

export const getMyProjectIds = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;
    const { data, error } = await supabaseAdmin
      .from("project_members" as any)
      .select("project_id")
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { project_ids: (data ?? []).map((r: any) => r.project_id) };
  });

// ---------- Project bewerken (admin, Instellingen tab) ----------

export const adminUpdateProjectDetail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      name: z.string().trim().min(1).max(200).optional(),
      category: z.string().trim().max(100).nullable().optional(),
      tags: z.array(z.string().trim().max(50)).optional(),
      start_date: z.string().nullable().optional(),
      deadline: z.string().nullable().optional(),
      budget: z.number().nullable().optional(),
      hours_estimated: z.number().nullable().optional(),
      hours_spent: z.number().optional(),
      progress_percentage: z.number().min(0).max(100).optional(),
      client_visible_notes: z.string().nullable().optional(),
      internal_notes: z.string().nullable().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { project_id, ...rest } = data;
    const { data: project, error } = await supabaseAdmin
      .from("projects" as any)
      .update(rest)
      .eq("id", project_id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logActivity(project_id, userId, "project_updated", "Projectgegevens bijgewerkt.");
    return { ok: true, project };
  });

export const adminUpdateProjectStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      status: z.enum(["concept", "in_uitvoering", "review", "afgerond", "on_hold", "geannuleerd"]),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const updates: Record<string, any> = { status: data.status };
    if (data.status === "afgerond") updates.completed_at = new Date().toISOString();
    const { data: project, error } = await supabaseAdmin
      .from("projects" as any)
      .update(updates)
      .eq("id", data.project_id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logActivity(data.project_id, userId, "status_change", `Status gewijzigd naar "${data.status}".`);
    return { ok: true, project };
  });

export const adminUpdateProjectPriority = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      priority: z.enum(["laag", "normaal", "hoog", "urgent"]),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: project, error } = await supabaseAdmin
      .from("projects" as any)
      .update({ priority: data.priority })
      .eq("id", data.project_id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logActivity(data.project_id, userId, "priority_change", `Prioriteit gewijzigd naar "${data.priority}".`);
    return { ok: true, project };
  });

// ---------- Milestones ----------

export const createMilestone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      title: z.string().trim().min(1).max(200),
      description: z.string().trim().max(2000).nullable().optional(),
      due_date: z.string().nullable().optional(),
      order: z.number().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: milestone, error } = await supabaseAdmin
      .from("project_milestones" as any)
      .insert({ ...data, status: "open" })
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logActivity(data.project_id, userId, "milestone_added", `Milestone "${data.title}" toegevoegd.`);
    return { ok: true, milestone };
  });

export const updateMilestone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      milestone_id: z.string().uuid(),
      project_id: z.string().uuid(),
      title: z.string().trim().min(1).max(200).optional(),
      description: z.string().trim().max(2000).nullable().optional(),
      due_date: z.string().nullable().optional(),
      status: z.enum(["open", "in_uitvoering", "afgerond"]).optional(),
      order: z.number().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { milestone_id, project_id, ...rest } = data;
    const { data: milestone, error } = await supabaseAdmin
      .from("project_milestones" as any)
      .update(rest)
      .eq("id", milestone_id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logActivity(project_id, userId, "milestone_updated", `Milestone "${(milestone as any).title}" bijgewerkt.`);
    return { ok: true, milestone };
  });

export const toggleMilestone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      milestone_id: z.string().uuid(),
      project_id: z.string().uuid(),
      completed: z.boolean(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: milestone, error } = await supabaseAdmin
      .from("project_milestones" as any)
      .update({
        status: data.completed ? "afgerond" : "open",
        completed_at: data.completed ? new Date().toISOString() : null,
      })
      .eq("id", data.milestone_id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logActivity(
      data.project_id,
      userId,
      "milestone_completed",
      `Milestone "${(milestone as any).title}" ${data.completed ? "afgevinkt" : "heropend"}.`,
    );
    return { ok: true, milestone };
  });

export const deleteMilestone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ milestone_id: z.string().uuid(), project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin.from("project_milestones" as any).delete().eq("id", data.milestone_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const reorderMilestones = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      ordered_ids: z.array(z.string().uuid()),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    await Promise.all(
      data.ordered_ids.map((id, idx) =>
        supabaseAdmin.from("project_milestones" as any).update({ order: idx }).eq("id", id),
      ),
    );
    return { ok: true };
  });

// ---------- Notities ----------

export const createProjectNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      content: z.string().trim().min(1).max(4000),
      is_client_visible: z.boolean().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: note, error } = await supabaseAdmin
      .from("project_notes" as any)
      .insert({
        project_id: data.project_id,
        author_id: userId,
        content: data.content,
        is_client_visible: data.is_client_visible ?? false,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logActivity(data.project_id, userId, "note_added", "Notitie toegevoegd.");
    return { ok: true, note };
  });

export const deleteProjectNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ note_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin.from("project_notes" as any).delete().eq("id", data.note_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Contacten ----------

export const createProjectContact = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      project_id: z.string().uuid(),
      name: z.string().trim().min(1).max(200),
      role: z.string().trim().max(100).nullable().optional(),
      email: z.string().trim().email().max(255).nullable().optional().or(z.literal("")),
      phone: z.string().trim().max(50).nullable().optional(),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { data: contact, error } = await supabaseAdmin
      .from("project_contacts" as any)
      .insert({ ...data, email: data.email || null })
      .select()
      .single();
    if (error) throw new Error(error.message);
    await logActivity(data.project_id, userId, "contact_added", `Contact "${data.name}" toegevoegd.`);
    return { ok: true, contact };
  });

export const deleteProjectContact = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ contact_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin.from("project_contacts" as any).delete().eq("id", data.contact_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteProjectDetail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ project_id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    await ensureAdmin(supabase, userId);
    const { error } = await supabaseAdmin.from("projects" as any).delete().eq("id", data.project_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
