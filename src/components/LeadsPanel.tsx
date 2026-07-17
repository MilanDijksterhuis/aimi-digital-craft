import React, { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Target, Upload, Phone, Mail, Plus, StickyNote, Trash2, X, Clock,
  Globe, AlertCircle, TrendingUp, Users, CheckCircle2, Download,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import {
  adminListLeads,
  adminImportLeads,
  adminCreateLead,
  adminUpdateLead,
  adminDeleteLead,
  adminAddLeadActivity,
  adminGetLeadActivities,
  adminBulkUpdateLeadStatus,
  adminBulkDeleteLeads,
} from "@/lib/admin.functions";
import { parseLeadsCsv } from "@/lib/csv";
import { useConfirm } from "@/components/ConfirmDialog";

const STATUSES = ["nieuw", "gebeld", "gemaild", "interesse", "geen_interesse", "klant"] as const;
type Status = (typeof STATUSES)[number];

const STATUS_LABEL: Record<Status, string> = {
  nieuw: "Nieuw",
  gebeld: "Gebeld",
  gemaild: "Gemaild",
  interesse: "Interesse",
  geen_interesse: "Geen interesse",
  klant: "Klant",
};

const STATUS_COLOR: Record<Status, string> = {
  nieuw: "bg-slate-500/15 text-slate-300",
  gebeld: "bg-blue-500/15 text-blue-400",
  gemaild: "bg-violet-500/15 text-violet-400",
  interesse: "bg-amber-500/15 text-amber-400",
  geen_interesse: "bg-red-500/15 text-red-400",
  klant: "bg-emerald-500/15 text-emerald-400",
};

/** Kleurstip per status, zodat de pipeline-tabs in één oogopslag leesbaar zijn. */
const STATUS_DOT: Record<Status, string> = {
  nieuw: "bg-slate-400",
  gebeld: "bg-blue-400",
  gemaild: "bg-violet-400",
  interesse: "bg-amber-400",
  geen_interesse: "bg-red-400",
  klant: "bg-emerald-400",
};

const ACTIVITY_LABEL: Record<string, string> = {
  call: "Gebeld",
  email: "Gemaild",
  note: "Notitie",
};

const SORTS = {
  urgentie: "Urgentie (actie eerst)",
  stil: "Langst geen contact",
  nieuwste: "Nieuwste eerst",
  naam: "Bedrijfsnaam A–Z",
} as const;
type SortKey = keyof typeof SORTS;

const DAY = 86_400_000;
/** Na hoeveel dagen zonder contact een benaderde lead opvolging nodig heeft. */
const FOLLOW_UP_DAYS = 7;
const PAGE_SIZE = 50;

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString("nl-NL", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

function relTime(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / DAY);
  if (days <= 0) return "vandaag";
  if (days === 1) return "gisteren";
  if (days < 30) return `${days} dagen geleden`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 maand geleden" : `${months} maanden geleden`;
}

/** Leads die nog actie nodig hebben: nooit benaderd, of al > FOLLOW_UP_DAYS stil. */
function needsAction(l: any): boolean {
  if (l.status === "klant" || l.status === "geen_interesse") return false;
  if (l.status === "nieuw") return true;
  if (!l.last_activity) return true;
  return Date.now() - new Date(l.last_activity.created_at).getTime() > FOLLOW_UP_DAYS * DAY;
}

const lastContactTime = (l: any) =>
  l.last_activity ? new Date(l.last_activity.created_at).getTime() : 0;

function downloadCsv(rows: any[]) {
  const head = ["bedrijfsnaam", "website aanwezig", "telefoonnummer", "mail", "status", "laatste contact"];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [
    head.join(";"),
    ...rows.map((l) =>
      [
        l.company_name,
        l.has_website ? "ja" : "nee",
        l.phone ?? "",
        l.email ?? "",
        STATUS_LABEL[l.status as Status] ?? l.status,
        l.last_activity ? fmtDate(l.last_activity.created_at) : "",
      ]
        .map(esc)
        .join(";"),
    ),
  ];
  // BOM zodat Excel UTF-8 correct leest
  const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function LeadsPanel() {
  const qc = useQueryClient();
  const { confirm } = useConfirm();
  const listFn = useServerFn(adminListLeads);
  const importFn = useServerFn(adminImportLeads);
  const createFn = useServerFn(adminCreateLead);
  const updateFn = useServerFn(adminUpdateLead);
  const deleteFn = useServerFn(adminDeleteLead);
  const activityFn = useServerFn(adminAddLeadActivity);
  const bulkStatusFn = useServerFn(adminBulkUpdateLeadStatus);
  const bulkDeleteFn = useServerFn(adminBulkDeleteLeads);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [onlyAction, setOnlyAction] = useState(false);
  const [websiteFilter, setWebsiteFilter] = useState<"all" | "yes" | "no">("all");
  const [sort, setSort] = useState<SortKey>("urgentie");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [openLead, setOpenLead] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: () => listFn({}),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-leads"] });
  const clearSelection = () => setSelected(new Set());

  const importM = useMutation({
    mutationFn: (rows: any[]) => importFn({ data: { rows } }),
    onSuccess: (res: any) => {
      invalidate();
      const skipped = res.skipped > 0 ? ` ${res.skipped} duplicaat/duplicaten overgeslagen.` : "";
      toast.success(`${res.imported} lead(s) geïmporteerd.${skipped}`);
    },
    onError: (e: any) => toast.error(`Import mislukt: ${e.message}`),
  });

  const updateM = useMutation({
    mutationFn: (v: any) => updateFn({ data: v }),
    onSuccess: invalidate,
    onError: (e: any) => toast.error(e.message),
  });

  const deleteM = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => { invalidate(); toast.success("Lead verwijderd."); },
    onError: (e: any) => toast.error(e.message),
  });

  const activityM = useMutation({
    mutationFn: (v: { lead_id: string; type: "call" | "email" | "note"; note?: string | null }) =>
      activityFn({ data: v }),
    onSuccess: (_r, v) => {
      invalidate();
      qc.invalidateQueries({ queryKey: ["lead-activities", v.lead_id] });
      toast.success(`${ACTIVITY_LABEL[v.type]} geregistreerd.`);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const createM = useMutation({
    mutationFn: (v: any) => createFn({ data: v }),
    onSuccess: () => { invalidate(); setShowNew(false); toast.success("Lead toegevoegd."); },
    onError: (e: any) => toast.error(e.message),
  });

  const bulkStatusM = useMutation({
    mutationFn: (v: { ids: string[]; status: Status }) => bulkStatusFn({ data: v }),
    onSuccess: (res: any) => { invalidate(); clearSelection(); toast.success(`${res.updated} lead(s) bijgewerkt.`); },
    onError: (e: any) => toast.error(e.message),
  });

  const bulkDeleteM = useMutation({
    mutationFn: (ids: string[]) => bulkDeleteFn({ data: { ids } }),
    onSuccess: (res: any) => { invalidate(); clearSelection(); toast.success(`${res.deleted} lead(s) verwijderd.`); },
    onError: (e: any) => toast.error(e.message),
  });

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const { leads, errors, missingColumns } = parseLeadsCsv(String(reader.result ?? ""));
      if (missingColumns.length > 0) {
        toast.error(`Verplichte kolom ontbreekt: ${missingColumns.join(", ")}. Verwachte kolommen: bedrijfsnaam, website aanwezig, telefoonnummer, mail.`);
        return;
      }
      if (leads.length === 0) {
        toast.error("Geen geldige rijen gevonden in het bestand.");
        return;
      }
      if (errors.length > 0) toast.warning(`${errors.length} rij(en) overgeslagen.`);
      importM.mutate(leads);
    };
    reader.onerror = () => toast.error("Kon het bestand niet lezen.");
    reader.readAsText(file, "utf-8");
    e.target.value = "";
  }

  const leads: any[] = (data as any)?.items ?? [];

  const stats = useMemo(() => {
    const byStatus = (s: Status) => leads.filter((l) => l.status === s).length;
    const klanten = byStatus("klant");
    return {
      totaal: leads.length,
      actie: leads.filter(needsAction).length,
      nieuw: byStatus("nieuw"),
      interesse: byStatus("interesse"),
      klanten,
      conversie: leads.length > 0 ? Math.round((klanten / leads.length) * 100) : 0,
    };
  }, [leads]);

  const statusCounts = useMemo(() => {
    const c: Record<string, number> = { all: leads.length };
    for (const s of STATUSES) c[s] = leads.filter((l) => l.status === s).length;
    return c;
  }, [leads]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const rows = leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (onlyAction && !needsAction(l)) return false;
      if (websiteFilter === "yes" && !l.has_website) return false;
      if (websiteFilter === "no" && l.has_website) return false;
      if (!q) return true;
      return (
        l.company_name?.toLowerCase().includes(q) ||
        l.phone?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q)
      );
    });

    const sorted = [...rows];
    if (sort === "urgentie") {
      sorted.sort((a, b) => {
        const d = (needsAction(a) ? 0 : 1) - (needsAction(b) ? 0 : 1);
        return d !== 0 ? d : lastContactTime(a) - lastContactTime(b);
      });
    } else if (sort === "stil") {
      sorted.sort((a, b) => lastContactTime(a) - lastContactTime(b));
    } else if (sort === "nieuwste") {
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else {
      sorted.sort((a, b) => a.company_name.localeCompare(b.company_name, "nl"));
    }
    return sorted;
  }, [leads, search, statusFilter, onlyAction, websiteFilter, sort]);

  // Terug naar pagina 1 en selectie legen zodra de filters wijzigen.
  useEffect(() => {
    setPage(0);
    clearSelection();
  }, [search, statusFilter, onlyAction, websiteFilter, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const allOnPageSelected = pageRows.length > 0 && pageRows.every((l) => selected.has(l.id));
  const toggleAllOnPage = () => {
    const next = new Set(selected);
    if (allOnPageSelected) pageRows.forEach((l) => next.delete(l.id));
    else pageRows.forEach((l) => next.add(l.id));
    setSelected(next);
  };
  const toggleOne = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h2 className="font-display text-xl font-semibold">Leads</h2>
        </div>
        <div className="flex items-center gap-2">
          <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={handleFile} className="hidden" />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={importM.isPending}
            className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/40 disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {importM.isPending ? "Importeren…" : "CSV importeren"}
          </button>
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus className="w-4 h-4" /> Nieuwe lead
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          icon={AlertCircle}
          label="Actie vereist"
          value={stats.actie}
          hint={stats.actie > 0 ? `Nieuw of > ${FOLLOW_UP_DAYS} dagen stil` : "Alles opgevolgd"}
          tone={stats.actie > 0 ? "warn" : "ok"}
          onClick={() => { setOnlyAction(true); setStatusFilter("all"); }}
          active={onlyAction}
        />
        <StatCard icon={Users} label="Totaal leads" value={stats.totaal} hint={`${stats.nieuw} nog niet benaderd`} />
        <StatCard icon={TrendingUp} label="Interesse" value={stats.interesse} hint="Warme leads" tone="amber" />
        <StatCard icon={CheckCircle2} label="Klant geworden" value={stats.klanten} hint={`${stats.conversie}% conversie`} tone="ok" />
      </div>

      {/* ── Primair filter: de pipeline ── */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex overflow-x-auto no-scrollbar">
          <PipelineTab
            label="Alle"
            count={statusCounts.all}
            active={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
          />
          {STATUSES.map((s) => (
            <PipelineTab
              key={s}
              label={STATUS_LABEL[s]}
              count={statusCounts[s]}
              dot={STATUS_DOT[s]}
              active={statusFilter === s}
              onClick={() => setStatusFilter(s)}
            />
          ))}
        </div>
      </div>

      {/* ── Secundair: zoeken, verfijnen, sorteren ── */}
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Zoek op bedrijf, telefoon of mail…"
          className="flex-1 min-w-56 rounded-md border border-input bg-background px-3 py-2 text-sm"
        />

        <button
          onClick={() => setOnlyAction((v) => !v)}
          className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors ${
            onlyAction
              ? "border-amber-500/50 bg-amber-500/15 text-amber-400"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <AlertCircle className="w-4 h-4" /> Actie vereist ({stats.actie})
        </button>

        <Segmented
          label="Website"
          value={websiteFilter}
          onChange={(v) => setWebsiteFilter(v as any)}
          options={[
            { value: "all", label: "Alle" },
            { value: "no", label: "Zonder" },
            { value: "yes", label: "Met" },
          ]}
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          aria-label="Sorteren"
        >
          {Object.entries(SORTS).map(([k, label]) => (
            <option key={k} value={k}>Sorteer: {label}</option>
          ))}
        </select>

        <button
          onClick={() => downloadCsv(filtered)}
          disabled={filtered.length === 0}
          className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/40 disabled:opacity-40"
          title="Exporteer de huidige selectie van filters naar CSV"
        >
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* ── Bulkbalk, alleen bij selectie ── */}
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm">
          <span className="font-medium">{selected.size} geselecteerd</span>
          <select
            defaultValue=""
            onChange={(e) => {
              const v = e.target.value as Status;
              if (!v) return;
              bulkStatusM.mutate({ ids: [...selected], status: v });
              e.target.value = "";
            }}
            className="rounded-md border border-input bg-background px-2 py-1 text-sm"
          >
            <option value="">Status wijzigen naar…</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABEL[s]}</option>
            ))}
          </select>
          <button
            onClick={async () => {
              if (await confirm({ description: `${selected.size} lead(s) definitief verwijderen?`, destructive: true })) bulkDeleteM.mutate([...selected]);
            }}
            className="flex items-center gap-1.5 rounded-md border border-destructive/40 px-2.5 py-1 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-3.5 h-3.5" /> Verwijderen
          </button>
          <button onClick={clearSelection} className="ml-auto text-muted-foreground hover:text-foreground">
            Deselecteren
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-10 text-center">
          {leads.length === 0 ? (
            <>
              <Target className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
              <p className="font-medium">Nog geen leads</p>
              <p className="text-sm text-muted-foreground mt-1">
                Importeer een CSV met de kolommen <strong>bedrijfsnaam</strong>, <strong>website aanwezig</strong>,{" "}
                <strong>telefoonnummer</strong> en <strong>mail</strong>.
              </p>
              <button
                onClick={() => fileRef.current?.click()}
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                <Upload className="w-4 h-4" /> CSV importeren
              </button>
            </>
          ) : (
            <p className="text-muted-foreground">Geen leads gevonden met deze filters.</p>
          )}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="p-3 w-10">
                    <input
                      type="checkbox"
                      checked={allOnPageSelected}
                      onChange={toggleAllOnPage}
                      aria-label="Selecteer alle leads op deze pagina"
                      className="w-4 h-4 accent-primary cursor-pointer"
                    />
                  </th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Bedrijf</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Contact</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Laatste contact</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Acties</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((l) => {
                  const actie = needsAction(l);
                  return (
                    <tr
                      key={l.id}
                      className={`border-t border-border transition-colors hover:bg-muted/20 ${
                        selected.has(l.id) ? "bg-primary/5" : actie ? "bg-amber-500/[0.04]" : ""
                      }`}
                    >
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selected.has(l.id)}
                          onChange={() => toggleOne(l.id)}
                          aria-label={`Selecteer ${l.company_name}`}
                          className="w-4 h-4 accent-primary cursor-pointer"
                        />
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {actie && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" title="Actie vereist" />}
                          <span className="font-medium">{l.company_name}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-xs">
                          <Globe className={`w-3 h-3 ${l.has_website ? "text-emerald-400" : "text-muted-foreground"}`} />
                          <span className={l.has_website ? "text-emerald-400" : "text-muted-foreground"}>
                            {l.has_website ? "Heeft website" : "Geen website"}
                          </span>
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="space-y-1">
                          {l.phone ? (
                            <a href={`tel:${l.phone}`} className="flex items-center gap-1.5 hover:text-primary">
                              <Phone className="w-3 h-3 text-muted-foreground" /> {l.phone}
                            </a>
                          ) : (
                            <span className="flex items-center gap-1.5 text-muted-foreground">
                              <Phone className="w-3 h-3" /> —
                            </span>
                          )}
                          {l.email ? (
                            <a href={`mailto:${l.email}`} className="flex items-center gap-1.5 hover:text-primary">
                              <Mail className="w-3 h-3 text-muted-foreground" /> {l.email}
                            </a>
                          ) : (
                            <span className="flex items-center gap-1.5 text-muted-foreground">
                              <Mail className="w-3 h-3" /> —
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-3">
                        <select
                          value={l.status}
                          onChange={(e) => updateM.mutate({ id: l.id, status: e.target.value })}
                          className={`rounded-full px-2.5 py-1 text-xs border-0 cursor-pointer ${STATUS_COLOR[l.status as Status]}`}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s} className="bg-card text-foreground">
                              {STATUS_LABEL[s]}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="p-3">
                        {l.last_activity ? (
                          <div>
                            <p className={actie ? "text-amber-400" : ""}>{relTime(l.last_activity.created_at)}</p>
                            <p className="text-xs text-muted-foreground">{ACTIVITY_LABEL[l.last_activity.type]}</p>
                          </div>
                        ) : (
                          <span className="text-amber-400">Nooit benaderd</span>
                        )}
                      </td>

                      <td className="p-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            title="Registreer belactie"
                            onClick={() => activityM.mutate({ lead_id: l.id, type: "call" })}
                            className="p-1.5 rounded-md hover:bg-muted text-blue-400"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                          <button
                            title="Registreer mailactie"
                            onClick={() => activityM.mutate({ lead_id: l.id, type: "email" })}
                            className="p-1.5 rounded-md hover:bg-muted text-violet-400"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            title="Contactlog & notities"
                            onClick={() => setOpenLead(l.id)}
                            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
                          >
                            <StickyNote className="w-4 h-4" />
                          </button>
                          <button
                            title="Verwijderen"
                            onClick={async () => {
                              if (await confirm({ description: `Lead "${l.company_name}" definitief verwijderen?`, destructive: true })) deleteM.mutate(l.id);
                            }}
                            className="p-1.5 rounded-md hover:bg-muted text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              Toont {safePage * PAGE_SIZE + 1}–{Math.min((safePage + 1) * PAGE_SIZE, filtered.length)} van {filtered.length}
            </p>
            {pageCount > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={safePage === 0}
                  className="p-1.5 rounded-md border border-border disabled:opacity-40 hover:bg-muted/40"
                  aria-label="Vorige pagina"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 text-muted-foreground">
                  {safePage + 1} / {pageCount}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                  disabled={safePage >= pageCount - 1}
                  className="p-1.5 rounded-md border border-border disabled:opacity-40 hover:bg-muted/40"
                  aria-label="Volgende pagina"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {openLead && (
        <LeadDetailModal
          lead={leads.find((l) => l.id === openLead)}
          onClose={() => setOpenLead(null)}
          onActivity={(type, note) => activityM.mutate({ lead_id: openLead, type, note })}
          onUpdate={(patch) => updateM.mutate({ id: openLead, ...patch })}
        />
      )}

      {showNew && <NewLeadModal onClose={() => setShowNew(false)} onCreate={(v) => createM.mutate(v)} pending={createM.isPending} />}
    </div>
  );
}

function PipelineTab({
  label,
  count,
  dot,
  active,
  onClick,
}: {
  label: string;
  count: number;
  dot?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm transition-colors ${
        active
          ? "border-primary text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {dot && <span className={`w-2 h-2 rounded-full ${dot}`} />}
      <span className={active ? "font-medium" : ""}>{label}</span>
      <span className={`rounded-full px-1.5 py-0.5 text-xs ${active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
        {count}
      </span>
    </button>
  );
}

function Segmented({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex rounded-md border border-border p-0.5">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`rounded px-2.5 py-1 text-xs transition-colors ${
              value === o.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = "neutral",
  onClick,
  active,
}: {
  icon: any;
  label: string;
  value: number;
  hint?: string;
  tone?: "neutral" | "warn" | "ok" | "amber";
  onClick?: () => void;
  active?: boolean;
}) {
  const toneColor =
    tone === "warn" ? "text-amber-400" : tone === "ok" ? "text-emerald-400" : tone === "amber" ? "text-amber-400" : "text-primary";

  const Tag: any = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={`rounded-lg border bg-card p-4 text-left transition-colors ${
        active ? "border-primary" : "border-border"
      } ${onClick ? "hover:bg-muted/30 cursor-pointer" : ""}`}
    >
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${toneColor}`} />
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      </div>
      <p className={`mt-2 font-display text-3xl font-semibold ${tone === "warn" && value > 0 ? "text-amber-400" : ""}`}>
        {value}
      </p>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
    </Tag>
  );
}

function LeadDetailModal({
  lead,
  onClose,
  onActivity,
  onUpdate,
}: {
  lead: any;
  onClose: () => void;
  onActivity: (type: "call" | "email" | "note", note: string | null) => void;
  onUpdate: (patch: any) => void;
}) {
  const getActs = useServerFn(adminGetLeadActivities);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(lead?.notes ?? "");

  const { data } = useQuery({
    queryKey: ["lead-activities", lead?.id],
    queryFn: () => getActs({ data: { lead_id: lead.id } }),
    enabled: !!lead?.id,
  });

  if (!lead) return null;
  const activities: any[] = (data as any)?.items ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-border bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold">{lead.company_name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {lead.phone ?? "geen telefoon"} · {lead.email ?? "geen mail"} ·{" "}
              {lead.has_website ? "heeft website" : "geen website"}
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium">Notities over deze lead</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={() => { if (notes !== (lead.notes ?? "")) onUpdate({ notes: notes || null }); }}
            rows={3}
            placeholder="Vrije notities…"
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="mt-5">
          <h4 className="text-sm font-medium mb-2">Contact registreren</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { onActivity("call", note || null); setNote(""); }}
              className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/40"
            >
              <Phone className="w-4 h-4 text-blue-400" /> Gebeld
            </button>
            <button
              onClick={() => { onActivity("email", note || null); setNote(""); }}
              className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/40"
            >
              <Mail className="w-4 h-4 text-violet-400" /> Gemaild
            </button>
            <button
              onClick={() => { if (!note.trim()) { return; } onActivity("note", note); setNote(""); }}
              disabled={!note.trim()}
              className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/40 disabled:opacity-40"
            >
              <StickyNote className="w-4 h-4" /> Notitie
            </button>
          </div>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optionele notitie bij deze actie…"
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Contactlog</h4>
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nog geen contact geregistreerd.</p>
          ) : (
            <ul className="space-y-2">
              {activities.map((a) => (
                <li key={a.id} className="flex items-start gap-3 rounded-md border border-border p-3">
                  <Clock className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{ACTIVITY_LABEL[a.type]}</span>
                      <span className="text-muted-foreground"> · {fmtDate(a.created_at)}</span>
                    </p>
                    {a.note && <p className="text-sm text-muted-foreground mt-0.5 break-words">{a.note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function NewLeadModal({
  onClose,
  onCreate,
  pending,
}: {
  onClose: () => void;
  onCreate: (v: any) => void;
  pending: boolean;
}) {
  const [company, setCompany] = useState("");
  const [hasWebsite, setHasWebsite] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-display text-xl font-semibold">Nieuwe lead</h3>
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!company.trim()) return;
            onCreate({
              company_name: company.trim(),
              has_website: hasWebsite,
              phone: phone.trim() || null,
              email: email.trim() || null,
            });
          }}
        >
          <div>
            <label className="text-sm font-medium">Bedrijfsnaam *</label>
            <input
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Telefoonnummer</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Mail (optioneel)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={hasWebsite}
              onChange={(e) => setHasWebsite(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            Website aanwezig
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/40">
              Annuleren
            </button>
            <button
              type="submit"
              disabled={pending || !company.trim()}
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {pending ? "Opslaan…" : "Toevoegen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
