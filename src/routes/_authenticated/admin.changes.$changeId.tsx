import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, FileText, MessageSquare, History, Paperclip, User, Building2, FolderKanban } from "lucide-react";
import {
  adminGetChangeDetail,
  adminUpdateRequestStatus,
  adminSetRequestFields,
  adminPostComment,
  adminAttachmentUrl,
} from "@/lib/admin.functions";
import { STATUS_LABEL, STATUS_COLOR, PRIORITY_LABEL, PRIORITY_COLOR, CATEGORY_LABEL } from "@/lib/status";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/admin/changes/$changeId")({
  head: () => ({ meta: [{ title: "Change — Admin — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AdminChangeDetailPage,
});

function AdminChangeDetailPage() {
  const { changeId } = useParams({ from: "/_authenticated/admin/changes/$changeId" });
  const getDetail = useServerFn(adminGetChangeDetail);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-change", changeId],
    queryFn: () => getDetail({ data: { id: changeId } }),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (error) {
    const msg = (error as Error).message;
    if (msg.includes("Forbidden")) {
      return (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6">
          <h2 className="font-display text-xl font-semibold">Geen toegang</h2>
          <p className="text-sm text-muted-foreground mt-2">Je account heeft geen admin-rol.</p>
        </div>
      );
    }
    return <p className="text-destructive">Fout: {msg}</p>;
  }

  if (!data) return null;

  return <ChangeDetail data={data} changeId={changeId} />;
}

function ChangeDetail({ data, changeId }: { data: any; changeId: string }) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-change", changeId] });

  const request = data.request;
  const customer = data.customer;
  const project = data.project;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm">
        <Link to="/admin/changes" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Terug naar Changes
        </Link>
      </div>

      <ChangeHeader request={request} customer={customer} project={project} onChanged={invalidate} />

      <Tabs defaultValue="overzicht">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="overzicht"><FileText className="w-3.5 h-3.5 mr-1.5" />Overzicht</TabsTrigger>
          <TabsTrigger value="communicatie"><MessageSquare className="w-3.5 h-3.5 mr-1.5" />Communicatie</TabsTrigger>
          <TabsTrigger value="tijdlijn"><History className="w-3.5 h-3.5 mr-1.5" />Tijdlijn</TabsTrigger>
        </TabsList>

        <TabsContent value="overzicht">
          <OverzichtTab request={request} project={project} onChanged={invalidate} />
        </TabsContent>
        <TabsContent value="communicatie">
          <CommunicatieTab request={request} customer={customer} onChanged={invalidate} />
        </TabsContent>
        <TabsContent value="tijdlijn">
          <TijdlijnTab request={request} auditLog={data.auditLog ?? []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChangeHeader({ request, customer, project, onChanged }: { request: any; customer: any; project: any; onChanged: () => void }) {
  const updateStatus = useServerFn(adminUpdateRequestStatus);
  const statusM = useMutation({
    mutationFn: (status: string) => updateStatus({ data: { id: request.id, status: status as any } }),
    onSuccess: () => { onChanged(); toast.success("Status bijgewerkt."); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center flex-wrap gap-2">
            <h1 className="font-display text-2xl font-bold truncate">
              {request.request_number ? `#${request.request_number} ` : ""}{request.title}
            </h1>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PRIORITY_COLOR[request.priority] ? "bg-muted" : "bg-muted"} ${PRIORITY_COLOR[request.priority]}`}>
              {PRIORITY_LABEL[request.priority]}
            </span>
            {request.rush && <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/15 text-destructive">Spoed</span>}
          </div>
          <div className="flex items-center flex-wrap gap-3 text-sm text-muted-foreground">
            {customer && (
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{customer.full_name || customer.email}</span>
            )}
            {customer?.company && <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />{customer.company}</span>}
            {project && (
              <Link to="/admin/projecten/$projectId" params={{ projectId: project.id }} className="flex items-center gap-1.5 hover:text-primary">
                <FolderKanban className="w-3.5 h-3.5" />{project.name}
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={request.status}
            onChange={(e) => statusM.mutate(e.target.value)}
            disabled={statusM.isPending}
            className="rounded-md border border-input bg-background px-2 py-1.5 text-sm"
          >
            {Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOR[request.status]}`}>{STATUS_LABEL[request.status]}</span>
        </div>
      </div>
    </div>
  );
}

// ---------------- Overzicht ----------------

function OverzichtTab({ request, project, onChanged }: { request: any; project: any; onChanged: () => void }) {
  const setFields = useServerFn(adminSetRequestFields);
  const [dueDate, setDueDate] = useState(request.due_date ?? "");

  const fieldsM = useMutation({
    mutationFn: (i: any) => setFields({ data: i }),
    onSuccess: () => { onChanged(); toast.success("Opgeslagen."); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-4 mt-2">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
          <h3 className="font-semibold text-sm">Omschrijving</h3>
          <p className="text-sm whitespace-pre-wrap text-muted-foreground">{request.description || "—"}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
          <h3 className="font-semibold text-sm">Details</h3>
          <dl className="text-sm space-y-1">
            <div className="flex justify-between"><dt className="text-muted-foreground">Categorie</dt><dd>{CATEGORY_LABEL[request.category ?? "other"] ?? "Anders"}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Gekoppeld project</dt><dd>{project?.name || "—"}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Betaald</dt><dd>{request.is_paid ? "Ja" : "Nee (gratis)"}</dd></div>
          </dl>
          <label className="block text-sm pt-1">
            <span className="text-muted-foreground">Geschatte oplevering</span>
            <input
              type="date"
              value={dueDate ?? ""}
              onChange={(e) => setDueDate(e.target.value)}
              onBlur={() => { if (dueDate !== (request.due_date ?? "")) fieldsM.mutate({ id: request.id, due_date: dueDate || null }); }}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
        </div>
      </div>

      {request.change_attachments?.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
          <h3 className="font-semibold text-sm flex items-center gap-1.5"><Paperclip className="w-4 h-4" />Bijlagen</h3>
          <AttachmentList attachments={request.change_attachments} />
        </div>
      )}
    </div>
  );
}

function AttachmentList({ attachments }: { attachments: any[] }) {
  const attUrl = useServerFn(adminAttachmentUrl);
  const open = async (file_path: string) => {
    const { url } = await attUrl({ data: { file_path } });
    window.open(url, "_blank");
  };
  return (
    <div className="flex flex-wrap gap-2">
      {attachments.map((a: any) => (
        <button key={a.id} onClick={() => open(a.file_path)} className="text-xs rounded-md border border-border bg-muted/40 px-2 py-1 hover:bg-accent">
          {a.file_name}
        </button>
      ))}
    </div>
  );
}

// ---------------- Communicatie ----------------

function CommunicatieTab({ request, customer, onChanged }: { request: any; customer: any; onChanged: () => void }) {
  const postComment = useServerFn(adminPostComment);
  const [comment, setComment] = useState("");

  const commentM = useMutation({
    mutationFn: (i: any) => postComment({ data: i }),
    onSuccess: () => { onChanged(); setComment(""); },
    onError: (e: any) => toast.error(e.message),
  });

  const comments = [...(request.change_comments ?? [])].sort((a: any, b: any) => a.created_at.localeCompare(b.created_at));

  return (
    <div className="space-y-3 mt-2 max-w-2xl">
      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nog geen berichten.</p>
      ) : (
        <ul className="space-y-2">
          {comments.map((c: any) => {
            const isCustomer = c.author_id === request.user_id;
            return (
              <li key={c.id} className={`rounded-lg p-3 ${isCustomer ? "bg-muted/40" : "bg-primary/5 border border-primary/20"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{isCustomer ? (customer?.full_name || customer?.email || "Klant") : "AIMI"}</span>
                  <span className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleString("nl-NL")}</span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{c.body}</p>
              </li>
            );
          })}
        </ul>
      )}

      <form
        onSubmit={(e) => { e.preventDefault(); if (!comment.trim()) return; commentM.mutate({ request_id: request.id, body: comment }); }}
        className="flex gap-2"
      >
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Antwoord aan klant…"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <button disabled={commentM.isPending || !comment.trim()} className="btn-primary text-sm">
          {commentM.isPending ? "Bezig…" : "Verstuur"}
        </button>
      </form>
    </div>
  );
}

// ---------------- Tijdlijn ----------------

function TijdlijnTab({ request, auditLog }: { request: any; auditLog: any[] }) {
  const events = [
    { id: "created", created_at: request.created_at, label: "Aangemaakt", actor: null },
    ...auditLog.map((a: any) => ({
      id: a.id,
      created_at: a.created_at,
      label: a.action === "change_status_changed"
        ? `Status gewijzigd: ${STATUS_LABEL[a.details?.from] ?? a.details?.from ?? "—"} → ${STATUS_LABEL[a.details?.to] ?? a.details?.to ?? "—"}`
        : a.action,
      actor: a.actor,
    })),
  ].sort((a, b) => b.created_at.localeCompare(a.created_at));

  return (
    <div className="space-y-2 mt-2 max-w-2xl">
      {events.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nog geen tijdlijn beschikbaar.</p>
      ) : (
        <ul className="space-y-2">
          {events.map((e) => (
            <li key={e.id} className="rounded-lg border border-border bg-card p-3 text-sm flex items-center justify-between gap-3">
              <div>
                <p>{e.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{e.actor ? (e.actor.full_name || e.actor.email) : "Systeem"}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{new Date(e.created_at).toLocaleString("nl-NL")}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
