import React, { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Target,
  Upload,
  Phone,
  Mail,
  Plus,
  StickyNote,
  Trash2,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  CheckCircle2,
  Download,
  ChevronLeft,
  ChevronRight,
  CalendarClock,
} from "lucide-react";
import {
  adminListLeads,
  adminImportLeads,
  adminCreateLead,
  adminUpdateLead,
  adminDeleteLead,
  adminAddLeadActivity,
  adminGetLeadActivities,
  adminCreateCallback,
} from "@/lib/admin.functions";
import { parseLeadsCsv } from "@/lib/csv";
import { useConfirm } from "@/components/ConfirmDialog";
import { CallbackScheduleForm } from "@/components/CallbackScheduleModal";

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

const ACTIVITY_LABEL: Record<string, string> = {
  call: "Gebeld",
  email: "Gemaild",
  note: "Notitie",
};

/** Merkkleur per status (design tokens uit de Leads-redesign). */
const STATUS_HEX: Record<Status, string> = {
  nieuw: "#7c8cff",
  gebeld: "#4d9fff",
  gemaild: "#c084fc",
  interesse: "#ffb020",
  geen_interesse: "#ff5c5c",
  klant: "#3ddc84",
};

/** Statuspil: "nieuw" neutraal, overige statussen getint in hun merkkleur. */
function pillStyle(status: Status): React.CSSProperties {
  if (status === "nieuw" || status === "gebeld" || status === "gemaild") {
    return { background: "#1e1e22", color: "rgba(255,255,255,.7)" };
  }
  const hex = STATUS_HEX[status];
  return { background: `${hex}24`, color: hex };
}

/** 1–2 letter-initialen uit de bedrijfsnaam voor de avatar-tegel. */
function initials(name: string): string {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  const s = ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
  return s || "?";
}

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
  new Date(s).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

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
  const head = [
    "bedrijfsnaam",
    "website aanwezig",
    "telefoonnummer",
    "mail",
    "status",
    "laatste contact",
  ];
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

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [onlyAction, setOnlyAction] = useState(false);
  const [sort, setSort] = useState<SortKey>("urgentie");
  const [page, setPage] = useState(0);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: () => listFn({}),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-leads"] });

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
    onSuccess: () => {
      invalidate();
      toast.success("Lead verwijderd.");
    },
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
    onSuccess: (res: any) => {
      invalidate();
      setShowNew(false);
      if (res?.id) setSelectedLeadId(res.id);
      toast.success("Lead toegevoegd.");
    },
    onError: (e: any) => toast.error(e.message),
  });

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const { leads, errors, missingColumns } = parseLeadsCsv(String(reader.result ?? ""));
      if (missingColumns.length > 0) {
        toast.error(
          `Verplichte kolom ontbreekt: ${missingColumns.join(", ")}. Verwachte kolommen: bedrijfsnaam, website aanwezig, telefoonnummer, mail.`,
        );
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
  }, [leads, search, statusFilter, onlyAction, sort]);

  // Terug naar pagina 1 zodra de filters wijzigen.
  useEffect(() => {
    setPage(0);
  }, [search, statusFilter, onlyAction, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  // Gekozen lead voor het detailpaneel; valt terug op de eerste zichtbare lead.
  const selectedLead =
    leads.find((l) => l.id === selectedLeadId) ?? pageRows[0] ?? filtered[0] ?? null;

  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }} className="space-y-6">
      <style>{`
        .leads-split { display: grid; grid-template-columns: 1.6fr 1fr; }
        @media (max-width: 900px) { .leads-split { grid-template-columns: 1fr; } .leads-list-col { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,.07); } }
      `}</style>
      {/* Kop + hoofdacties */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-white font-bold" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>Leads</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.45)", marginTop: 5 }}>
            Klik een lead om details, notities en terugbelacties te openen
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            onChange={handleFile}
            className="hidden"
          />
          <button
            onClick={() => downloadCsv(filtered)}
            disabled={filtered.length === 0}
            className="flex items-center gap-1.5 hover:brightness-125 transition disabled:opacity-40"
            style={{ padding: "10px 18px", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, fontSize: 13.5, color: "rgba(255,255,255,.75)" }}
            title="Exporteer de huidige filterselectie naar CSV"
          >
            <Download className="w-4 h-4" /> Export
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            disabled={importM.isPending}
            className="flex items-center gap-1.5 hover:brightness-125 transition disabled:opacity-50"
            style={{ padding: "10px 18px", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, fontSize: 13.5, color: "rgba(255,255,255,.75)" }}
          >
            <Upload className="w-4 h-4" /> {importM.isPending ? "Importeren…" : "CSV importeren"}
          </button>
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-1.5 hover:brightness-110 transition"
            style={{ padding: "10px 20px", background: "linear-gradient(180deg,#ff4d4d,#e01e1e)", borderRadius: 8, fontSize: 13.5, fontWeight: 600, color: "#fff", boxShadow: "0 4px 16px rgba(224,30,30,.35)" }}
          >
            <Plus className="w-4 h-4" /> Nieuwe lead
          </button>
        </div>
      </div>

      {/* KPI-rij */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <KpiCard
          icon={AlertCircle}
          label="Actie vereist"
          value={stats.actie}
          hint={stats.actie > 0 ? `Nieuw of > ${FOLLOW_UP_DAYS} dagen stil` : "Alles opgevolgd"}
          urgent
          active={onlyAction}
          onClick={() => { setOnlyAction((v) => !v); setStatusFilter("all"); }}
        />
        <KpiCard icon={Users} label="Totaal leads" value={stats.totaal} hint={`${stats.nieuw} nog niet benaderd`} />
        <KpiCard icon={TrendingUp} label="Interesse" value={stats.interesse} hint="Warme leads" />
        <KpiCard icon={CheckCircle2} label="Klant geworden" value={stats.klanten} hint={`${stats.conversie}% conversie`} />
      </div>

      {/* Hoofdpaneel: lijst (links) + detail (rechts) */}
      <div
        className="leads-split"
        style={{ background: "#0e0e10", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12, overflow: "hidden" }}
      >
        {/* Linkerkolom: filters + lijst */}
        <div className="leads-list-col" style={{ padding: "18px 20px 20px", borderRight: "1px solid rgba(255,255,255,.07)" }}>
          {/* Zoeken + sorteren */}
          <div className="flex gap-2 mb-3.5">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Zoek op bedrijf, telefoon of e-mail…"
              className="flex-1 min-w-0"
              style={{ background: "#161619", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#fff" }}
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sorteren"
              style={{ background: "#161619", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "rgba(255,255,255,.6)" }}
            >
              {Object.entries(SORTS).map(([k, label]) => (
                <option key={k} value={k} style={{ background: "#161619", color: "#fff" }}>{label}</option>
              ))}
            </select>
          </div>

          {/* Statusfilter-chips */}
          <div className="flex gap-1.5 mb-3.5 flex-wrap">
            <button
              onClick={() => { setStatusFilter("all"); setOnlyAction(false); }}
              style={{
                padding: "6px 12px", borderRadius: 6, fontSize: 12,
                background: statusFilter === "all" && !onlyAction ? "#1e1e22" : "transparent",
                color: statusFilter === "all" && !onlyAction ? "#fff" : "rgba(255,255,255,.5)",
                fontWeight: statusFilter === "all" && !onlyAction ? 600 : 400,
              }}
            >
              Alle {statusCounts.all}
            </button>
            {STATUSES.map((s) => {
              const active = statusFilter === s;
              return (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setOnlyAction(false); }}
                  className="flex items-center gap-1.5"
                  style={{
                    padding: "6px 12px", borderRadius: 6, fontSize: 12,
                    background: active ? "#1e1e22" : "transparent",
                    color: active ? "#fff" : "rgba(255,255,255,.5)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_HEX[s] }} />
                  {STATUS_LABEL[s]} {statusCounts[s]}
                </button>
              );
            })}
          </div>

          {/* Lijst */}
          {filtered.length === 0 ? (
            <div className="text-center" style={{ padding: "40px 10px" }}>
              {leads.length === 0 ? (
                <>
                  <Target className="w-8 h-8 mx-auto mb-3" style={{ color: "rgba(255,255,255,.3)" }} />
                  <p className="font-medium text-white">Nog geen leads</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 4 }}>
                    Importeer een CSV met de kolommen <strong>bedrijfsnaam</strong>,{" "}
                    <strong>website aanwezig</strong>, <strong>telefoonnummer</strong> en <strong>mail</strong>.
                  </p>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="mt-4 inline-flex items-center gap-2 hover:brightness-110 transition"
                    style={{ padding: "10px 18px", background: "linear-gradient(180deg,#ff4d4d,#e01e1e)", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#fff" }}
                  >
                    <Upload className="w-4 h-4" /> CSV importeren
                  </button>
                </>
              ) : (
                <p style={{ color: "rgba(255,255,255,.4)", fontSize: 13 }}>Geen leads gevonden met deze filters.</p>
              )}
            </div>
          ) : (
            <>
              <div style={{ maxHeight: 640, overflowY: "auto" }} className="space-y-2 pr-1">
                {pageRows.map((l) => {
                  const active = selectedLead?.id === l.id;
                  const st = l.status as Status;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setSelectedLeadId(l.id)}
                      className="w-full text-left flex items-center justify-between hover:brightness-125 transition"
                      style={{
                        padding: "13px 15px", borderRadius: 9,
                        background: active ? "#1a1418" : "#111113",
                        border: active ? "1px solid rgba(255,90,90,.35)" : "1px solid rgba(255,255,255,.05)",
                      }}
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="shrink-0 flex items-center justify-center font-bold"
                          style={{
                            width: 32, height: 32, borderRadius: 8, fontSize: 12.5,
                            background: active ? "#241618" : "#1e1e22",
                            color: active ? "#ff6b6b" : STATUS_HEX[st],
                          }}
                        >
                          {initials(l.company_name)}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate" style={{ color: "#fff", fontSize: 13.5, fontWeight: 600 }}>{l.company_name}</span>
                          <span className="block truncate" style={{ color: "rgba(255,255,255,.4)", fontSize: 12, marginTop: 2 }}>
                            {l.phone || "geen telefoon"} · {l.has_website ? "Website" : "Geen website"}
                          </span>
                        </span>
                      </span>
                      <span className="shrink-0" style={{ ...pillStyle(st), fontSize: 12, padding: "5px 11px", borderRadius: 6 }}>
                        {STATUS_LABEL[st]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-3" style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>
                <span>
                  {safePage * PAGE_SIZE + 1}–{Math.min((safePage + 1) * PAGE_SIZE, filtered.length)} van {filtered.length}
                </span>
                {pageCount > 1 && (
                  <span className="flex items-center gap-1">
                    <button
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={safePage === 0}
                      className="p-1.5 rounded-md disabled:opacity-40 hover:brightness-125"
                      style={{ border: "1px solid rgba(255,255,255,.08)" }}
                      aria-label="Vorige pagina"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-2">{safePage + 1} / {pageCount}</span>
                    <button
                      onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                      disabled={safePage >= pageCount - 1}
                      className="p-1.5 rounded-md disabled:opacity-40 hover:brightness-125"
                      style={{ border: "1px solid rgba(255,255,255,.08)" }}
                      aria-label="Volgende pagina"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Rechterkolom: detailpaneel */}
        <div style={{ padding: "22px 26px 26px", background: "#0e0e10" }}>
          {selectedLead ? (
            <LeadDetail
              key={selectedLead.id}
              lead={selectedLead}
              onActivity={(type, note) => activityM.mutate({ lead_id: selectedLead.id, type, note })}
              onUpdate={(patch) => updateM.mutate({ id: selectedLead.id, ...patch })}
              onDelete={async () => {
                if (
                  await confirm({
                    description: `Lead "${selectedLead.company_name}" definitief verwijderen?`,
                    destructive: true,
                  })
                ) {
                  deleteM.mutate(selectedLead.id);
                  setSelectedLeadId(null);
                }
              }}
            />
          ) : (
            <p style={{ color: "rgba(255,255,255,.35)", fontSize: 13 }}>Selecteer een lead om details te bekijken.</p>
          )}
        </div>
      </div>

      {showNew && (
        <NewLeadModal
          onClose={() => setShowNew(false)}
          onCreate={(v) => createM.mutate(v)}
          pending={createM.isPending}
        />
      )}
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  hint,
  urgent,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  value: number;
  hint?: string;
  urgent?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  const flag = urgent && value > 0;
  const Tag: any = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={`text-left ${onClick ? "hover:brightness-125 transition cursor-pointer" : ""}`}
      style={{
        background: "#141417",
        border: `1px solid ${active ? "rgba(255,90,90,.5)" : flag ? "rgba(255,90,90,.28)" : "rgba(255,255,255,.07)"}`,
        borderRadius: 12,
        padding: "18px 20px",
      }}
    >
      <div className="flex items-center gap-1.5" style={{ fontSize: 11.5, letterSpacing: ".06em", fontWeight: 600, color: flag ? "#ff6b6b" : "rgba(255,255,255,.4)" }}>
        <Icon className="w-3.5 h-3.5" /> {label.toUpperCase()}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginTop: 6 }}>{value}</div>
      {hint && <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{hint}</div>}
    </Tag>
  );
}

function LeadDetail({
  lead,
  onActivity,
  onUpdate,
  onDelete,
}: {
  lead: any;
  onActivity: (type: "call" | "email" | "note", note: string | null) => void;
  onUpdate: (patch: any) => void;
  onDelete: () => void;
}) {
  const qc = useQueryClient();
  const getActs = useServerFn(adminGetLeadActivities);
  const callbackFn = useServerFn(adminCreateCallback);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(lead?.notes ?? "");
  const [showSchedule, setShowSchedule] = useState(false);

  const { data } = useQuery({
    queryKey: ["lead-activities", lead?.id],
    queryFn: () => getActs({ data: { lead_id: lead.id } }),
    enabled: !!lead?.id,
  });

  const scheduleM = useMutation({
    mutationFn: (v: {
      reason: string;
      note: string | null;
      scheduled_at: string;
      auto_scheduled: boolean;
    }) => callbackFn({ data: { lead_id: lead.id, ...v } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lead-callbacks"] });
      setShowSchedule(false);
      toast.success("Terugbelactie ingepland.");
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (!lead) return null;
  const activities: any[] = (data as any)?.items ?? [];
  const st = lead.status as Status;
  const label = { fontSize: 11.5, letterSpacing: ".05em", color: "rgba(255,255,255,.35)", marginBottom: 8 } as const;
  const surface = {
    background: "#17171a",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 8,
  } as const;

  return (
    <div>
      {/* Kop */}
      <div className="flex items-center gap-2.5" style={{ marginBottom: 4 }}>
        <span
          className="shrink-0 flex items-center justify-center font-bold"
          style={{ width: 38, height: 38, borderRadius: 10, background: "#241618", color: "#ff6b6b", fontSize: 14 }}
        >
          {initials(lead.company_name)}
        </span>
        <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }} className="min-w-0 truncate">
          {lead.company_name}
        </span>
      </div>
      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.4)", marginBottom: 20 }}>
        {lead.has_website ? "Website" : "Geen website"} ·{" "}
        {lead.last_activity ? `Laatst: ${relTime(lead.last_activity.created_at)}` : "Nooit benaderd"}
      </div>

      {/* Actierij */}
      <div className="flex gap-2" style={{ marginBottom: 22 }}>
        <a
          href={lead.phone ? `tel:${lead.phone}` : undefined}
          onClick={() => { if (lead.phone) onActivity("call", null); }}
          aria-disabled={!lead.phone}
          className="flex-1 text-center hover:brightness-125 transition"
          style={{ padding: 10, background: "#1e1e22", borderRadius: 8, fontSize: 13, color: "#fff", opacity: lead.phone ? 1 : 0.4, pointerEvents: lead.phone ? "auto" : "none" }}
        >
          📞 Bellen
        </a>
        <a
          href={lead.email ? `mailto:${lead.email}` : undefined}
          onClick={() => { if (lead.email) onActivity("email", null); }}
          aria-disabled={!lead.email}
          className="flex-1 text-center hover:brightness-125 transition"
          style={{ padding: 10, background: "#1e1e22", borderRadius: 8, fontSize: 13, color: "#fff", opacity: lead.email ? 1 : 0.4, pointerEvents: lead.email ? "auto" : "none" }}
        >
          ✉ Mailen
        </a>
        <button
          onClick={() => setShowSchedule((v) => !v)}
          aria-expanded={showSchedule}
          className="flex-1 text-center hover:brightness-110 transition"
          style={{ padding: 10, background: "linear-gradient(180deg,#ff4d4d,#e01e1e)", borderRadius: 8, fontSize: 13, color: "#fff", fontWeight: 600, boxShadow: "0 4px 14px rgba(224,30,30,.3)" }}
        >
          📅 Terugbel plannen
        </button>
      </div>

      {/* Inplan-formulier klapt uit */}
      {showSchedule && (
        <div className="mb-5" style={{ ...surface, padding: 14 }}>
          <div className="mb-3 flex items-center gap-2">
            <CalendarClock className="w-4 h-4" style={{ color: "#ff6b6b" }} />
            <h4 className="text-sm font-medium text-white">Terugbel inplannen</h4>
          </div>
          <CallbackScheduleForm
            pending={scheduleM.isPending}
            onSchedule={(v) => scheduleM.mutate(v)}
            onCancel={() => setShowSchedule(false)}
          />
        </div>
      )}

      {/* Status */}
      <div style={label}>STATUS</div>
      <div className="relative mb-5">
        <select
          value={st}
          onChange={(e) => onUpdate({ status: e.target.value })}
          className="w-full cursor-pointer"
          style={{ ...surface, padding: "10px 14px", fontSize: 13, color: "#fff", appearance: "none" }}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s} style={{ background: "#17171a", color: "#fff" }}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,.5)" }}>⌄</span>
      </div>

      {/* Notities */}
      <div style={label}>NOTITIES</div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={() => { if (notes !== (lead.notes ?? "")) onUpdate({ notes: notes || null }); }}
        placeholder="Nog geen notities toegevoegd…"
        className="w-full mb-5"
        style={{ ...surface, padding: 14, fontSize: 13, color: "#fff", minHeight: 90, resize: "vertical" }}
      />

      {/* Contact registreren */}
      <div style={label}>CONTACT REGISTREREN</div>
      <div className="flex flex-wrap gap-2 mb-2">
        <button
          onClick={() => { onActivity("call", note || null); setNote(""); }}
          className="flex items-center gap-2 hover:brightness-125 transition"
          style={{ ...surface, padding: "8px 12px", fontSize: 13, color: "#fff" }}
        >
          <Phone className="w-4 h-4" style={{ color: "#4d9fff" }} /> Gebeld
        </button>
        <button
          onClick={() => { onActivity("email", note || null); setNote(""); }}
          className="flex items-center gap-2 hover:brightness-125 transition"
          style={{ ...surface, padding: "8px 12px", fontSize: 13, color: "#fff" }}
        >
          <Mail className="w-4 h-4" style={{ color: "#c084fc" }} /> Gemaild
        </button>
        <button
          onClick={() => { if (!note.trim()) return; onActivity("note", note); setNote(""); }}
          disabled={!note.trim()}
          className="flex items-center gap-2 hover:brightness-125 transition disabled:opacity-40"
          style={{ ...surface, padding: "8px 12px", fontSize: 13, color: "#fff" }}
        >
          <StickyNote className="w-4 h-4" /> Notitie
        </button>
      </div>
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optionele notitie bij deze actie…"
        className="w-full mb-5"
        style={{ ...surface, padding: "8px 12px", fontSize: 13, color: "#fff" }}
      />

      {/* Contactlog */}
      <div style={label}>CONTACTLOG</div>
      {activities.length === 0 ? (
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)" }}>Nog geen contact geregistreerd.</p>
      ) : (
        <ul className="space-y-2">
          {activities.map((a) => (
            <li key={a.id} className="flex items-start gap-3" style={{ ...surface, padding: 12 }}>
              <Clock className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,.4)" }} />
              <div className="min-w-0">
                <p style={{ fontSize: 13, color: "#fff" }}>
                  <span className="font-medium">{ACTIVITY_LABEL[a.type]}</span>
                  <span style={{ color: "rgba(255,255,255,.4)" }}> · {fmtDate(a.created_at)}</span>
                </p>
                {a.note && <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 2 }} className="break-words">{a.note}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Verwijderen */}
      <button
        onClick={onDelete}
        className="mt-6 flex items-center gap-2 hover:brightness-125 transition"
        style={{ fontSize: 12.5, color: "#ff5c5c" }}
      >
        <Trash2 className="w-3.5 h-3.5" /> Lead verwijderen
      </button>
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-border bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
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
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/40"
            >
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
