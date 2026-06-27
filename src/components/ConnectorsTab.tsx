import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle, ExternalLink, Mail, Plug } from "lucide-react";
import {
  adminGetConnectorSettings,
  adminSaveConnectorSettings,
  adminDisconnectGmail,
} from "@/lib/admin.functions";

export function ConnectorsTab() {
  const getSettings = useServerFn(adminGetConnectorSettings);
  const saveSettings = useServerFn(adminSaveConnectorSettings);
  const disconnect = useServerFn(adminDisconnectGmail);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["connector-settings"],
    queryFn: () => getSettings({}),
  });

  const [fromEmail, setFromEmail] = useState("");
  const [fromName, setFromName] = useState("");

  useEffect(() => {
    if (data) {
      setFromEmail(data.from_email ?? "");
      setFromName(data.from_name ?? "AIMI Backoffice");
    }
  }, [data]);

  // Check URL params for OAuth result
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("connector_success") === "1") {
      toast.success("Google-account succesvol gekoppeld!");
      qc.invalidateQueries({ queryKey: ["connector-settings"] });
      window.history.replaceState({}, "", window.location.pathname);
    }
    const err = params.get("connector_error");
    if (err) {
      toast.error(`Koppeling mislukt: ${decodeURIComponent(err)}`);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const saveM = useMutation({
    mutationFn: () => saveSettings({ data: { from_email: fromEmail, from_name: fromName } }),
    onSuccess: () => {
      toast.success("Instellingen opgeslagen.");
      qc.invalidateQueries({ queryKey: ["connector-settings"] });
    },
    onError: (e: any) => toast.error(e.message ?? "Opslaan mislukt."),
  });

  const disconnectM = useMutation({
    mutationFn: () => disconnect({}),
    onSuccess: () => {
      toast.success("Google-account losgekoppeld.");
      qc.invalidateQueries({ queryKey: ["connector-settings"] });
    },
    onError: (e: any) => toast.error(e.message ?? "Loskoppelen mislukt."),
  });

  if (isLoading) {
    return <p className="text-muted-foreground">Instellingen laden…</p>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="font-display text-2xl font-semibold text-foreground">Connectors</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Koppel externe diensten voor het versturen van e-mails en andere integraties.
        </p>
      </div>

      {/* Gmail connector card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <div className="flex items-start gap-4">
          {/* Google G logo */}
          <div className="w-10 h-10 rounded-lg border border-border bg-background flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h3 className="font-semibold text-foreground">Gmail / Google Workspace</h3>
                <p className="text-sm text-muted-foreground">Verstuur welkomstmails via jouw Google-account.</p>
              </div>
              {data?.connected ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Verbonden
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-muted-foreground text-sm">
                  <XCircle className="w-4 h-4" /> Niet verbonden
                </span>
              )}
            </div>

            {data?.connected && (
              <p className="mt-2 text-xs text-muted-foreground">
                Gekoppeld account: <strong className="text-foreground">{data.email}</strong>
              </p>
            )}
          </div>
        </div>

        {data?.connected ? (
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => disconnectM.mutate()}
              disabled={disconnectM.isPending}
              className="px-4 py-2 rounded-md border border-border text-sm text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
            >
              {disconnectM.isPending ? "Bezig…" : "Loskoppelen"}
            </button>
            <a
              href={data.authUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Ander account koppelen
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-amber-400 space-y-1">
              <p className="font-medium">Vereist: Google Cloud instelling</p>
              <p className="text-xs text-amber-400/80">
                Voeg eerst <code className="bg-amber-500/10 px-1 rounded">GOOGLE_CLIENT_ID</code>, <code className="bg-amber-500/10 px-1 rounded">GOOGLE_CLIENT_SECRET</code> en <code className="bg-amber-500/10 px-1 rounded">VITE_APP_URL</code> toe aan je <code className="bg-amber-500/10 px-1 rounded">.env</code>.
                Redirect URI instellen op: <strong>{typeof window !== "undefined" ? `${window.location.origin}/api/auth/google/callback` : "/api/auth/google/callback"}</strong>
              </p>
            </div>
            <a
              href={data?.authUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plug className="w-3.5 h-3.5" /> Verbinden met Google
            </a>
          </div>
        )}
      </div>

      {/* E-mail instellingen — alleen tonen als verbonden */}
      {data?.connected && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">E-mailinstellingen</h3>
              <p className="text-sm text-muted-foreground">Stel in welke naam en welk adres klanten zien als afzender.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Afzendernaam</label>
              <input
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                placeholder="bijv. AIMI Backoffice"
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Afzenderadres (from)</label>
              <input
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                placeholder="bijv. sales@aimi-development.nl"
                type="email"
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">
                Moet hetzelfde domein zijn als het gekoppelde Google Workspace-account.
              </p>
            </div>
          </div>

          <button
            onClick={() => saveM.mutate()}
            disabled={saveM.isPending || !fromEmail.trim()}
            className="px-5 py-2 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {saveM.isPending ? "Opslaan…" : "Opslaan"}
          </button>
        </div>
      )}
    </div>
  );
}
