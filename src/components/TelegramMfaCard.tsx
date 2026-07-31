import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Send, ShieldCheck, Info, ExternalLink, Loader2, Unlink } from "lucide-react";
import {
  adminGenerateTelegramLink,
  adminGetTelegramStatus,
  adminUnlinkTelegram,
  adminSetMfaEnabled,
} from "@/lib/telegram.functions";

// Telegram-koppeling + MFA-toggle voor één (admin-)account. Wordt getoond in de
// Instellingen-tab van het accountscherm. Alleen Aidan/Milan gebruiken dit in
// de praktijk, dus de handleiding is kort en praktisch.
export function TelegramMfaCard({ accountId }: { accountId: string }) {
  const getStatus = useServerFn(adminGetTelegramStatus);
  const genLink = useServerFn(adminGenerateTelegramLink);
  const unlink = useServerFn(adminUnlinkTelegram);
  const setMfa = useServerFn(adminSetMfaEnabled);

  const [waiting, setWaiting] = useState(false);

  const { data: status, refetch } = useQuery({
    queryKey: ["telegram-status", accountId],
    queryFn: () => getStatus({ data: { user_id: accountId } }),
    // Poll elke 3s zolang we op een koppeling wachten.
    refetchInterval: waiting ? 3000 : false,
  });

  const linked = !!status?.linked;
  const mfaEnabled = !!status?.mfa_enabled;

  // Zodra de poll ziet dat de koppeling gelukt is, stoppen we met wachten.
  useEffect(() => {
    if (waiting && linked) {
      setWaiting(false);
      toast.success("Telegram gekoppeld ✅");
    }
  }, [waiting, linked]);

  const linkM = useMutation({
    mutationFn: () => genLink({ data: { user_id: accountId } }),
    onSuccess: ({ deepLink }) => {
      setWaiting(true);
      window.open(deepLink, "_blank", "noopener");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const unlinkM = useMutation({
    mutationFn: () => unlink({ data: { user_id: accountId } }),
    onSuccess: () => { setWaiting(false); refetch(); toast.success("Telegram ontkoppeld."); },
    onError: (e: any) => toast.error(e.message),
  });

  const mfaM = useMutation({
    mutationFn: (enabled: boolean) => setMfa({ data: { user_id: accountId, enabled } }),
    onSuccess: () => { refetch(); toast.success("Bijgewerkt."); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Telegram &amp; MFA
        </h3>
      </div>

      {/* Uitklapbare handleiding */}
      <details className="rounded-md border border-border bg-background/40 text-sm">
        <summary className="cursor-pointer select-none px-3 py-2 flex items-center gap-1.5 text-muted-foreground">
          <Info className="w-3.5 h-3.5" /> Hoe werkt dit? (stappenplan)
        </summary>
        <ol className="list-decimal space-y-1 px-8 pb-3 pt-1 text-muted-foreground">
          <li>Open Telegram op je telefoon.</li>
          <li>Klik hieronder op “Koppel Telegram” en volg de link naar onze bot.</li>
          <li>Druk in Telegram op <strong>Start</strong>.</li>
          <li>Terug in het portaal verschijnt automatisch “Telegram gekoppeld ✅”.</li>
          <li>Vink daarna “MFA via Telegram inschakelen” aan.</li>
          <li>Vanaf nu ontvang je bij het inloggen een 6-cijferige code via Telegram.</li>
        </ol>
      </details>

      {/* Koppelstatus */}
      {linked ? (
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-emerald-600 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Telegram gekoppeld ✅ {status?.username ? `(@${status.username})` : ""}
          </p>
          <button
            onClick={() => unlinkM.mutate()}
            disabled={unlinkM.isPending}
            className="inline-flex items-center gap-1.5 text-xs rounded-md border border-border px-2.5 py-1.5 text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
          >
            <Unlink className="w-3.5 h-3.5" /> Ontkoppelen
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <button
            onClick={() => linkM.mutate()}
            disabled={linkM.isPending}
            className="inline-flex items-center gap-2 text-sm rounded-md border border-border px-3 py-2 hover:border-primary hover:text-primary transition-colors"
          >
            {linkM.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Koppel Telegram
          </button>
          {waiting && (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Wachten op koppeling… Druk in Telegram op “Start”.
              {linkM.data?.deepLink && (
                <a href={linkM.data.deepLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                  Open in Telegram <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </p>
          )}
        </div>
      )}

      {/* MFA-checkbox */}
      <label
        className={`flex items-center gap-2 text-sm ${linked ? "" : "opacity-50 cursor-not-allowed"}`}
        title={linked ? undefined : "Koppel eerst Telegram om MFA in te schakelen"}
      >
        <input
          type="checkbox"
          checked={mfaEnabled}
          disabled={!linked || mfaM.isPending}
          onChange={(e) => mfaM.mutate(e.target.checked)}
        />
        MFA via Telegram inschakelen
      </label>
      {!linked && (
        <p className="text-xs text-muted-foreground -mt-2">Koppel eerst Telegram om MFA in te schakelen.</p>
      )}
    </div>
  );
}
