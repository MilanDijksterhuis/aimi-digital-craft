import { supabaseAdmin } from "@/integrations/supabase/client.server";

export async function adminListRedirectsImpl() {
  const { data, error } = await supabaseAdmin
    .from("redirects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return { redirects: data ?? [] };
}

export async function adminCreateRedirectImpl(fromPath: string, toPath: string, createdBy: string) {
  if (fromPath === toPath) throw new Error("Van- en naar-URL mogen niet gelijk zijn.");
  const { data, error } = await supabaseAdmin
    .from("redirects")
    .insert({ from_path: fromPath, to_path: toPath, created_by: createdBy })
    .select("*")
    .single();
  if (error) {
    if (error.code === "23505") {
      throw new Error(`Er bestaat al een redirect vanaf "${fromPath}".`);
    }
    throw new Error(error.message);
  }
  return { redirect: data };
}

export async function adminDeleteRedirectImpl(id: string) {
  const { error } = await supabaseAdmin.from("redirects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}
