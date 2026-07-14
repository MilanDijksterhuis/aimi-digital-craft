import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  X, LayoutGrid, FileText, MessageSquare, PhoneCall, CheckCircle2, Check,
  ChevronLeft, ChevronRight, Building2, Phone, Globe, User,
} from "lucide-react";
import { portalSaveOnboardingStep, portalCompleteOnboarding } from "@/lib/portal.functions";

type ContactBlock = { name?: string; email?: string; phone?: string };
type Contacts = { financial?: ContactBlock; technical?: ContactBlock; general?: ContactBlock };

type FormState = {
  company: string;
  address: string;
  kvk: string;
  contact_person: string;
  phone: string;
  website_url: string;
  contacts: Contacts;
};

type Profile = {
  company?: string | null;
  address?: string | null;
  kvk?: string | null;
  contact_person?: string | null;
  phone?: string | null;
  website_url?: string | null;
  contacts?: Contacts | null;
  email?: string | null;
  onboarding_status?: string | null;
  onboarding_step?: number | null;
};

const STEP_TITLES = ["Bedrijfsgegevens", "Contactvoorkeuren", "Projectgegevens", "Extra contactpersonen", "Afronding"];

const fadeVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function PortalOnboardingTour({ profile, onClose }: { profile: Profile; onClose: () => void }) {
  const saveStep = useServerFn(portalSaveOnboardingStep);
  const completeOnboarding = useServerFn(portalCompleteOnboarding);
  const qc = useQueryClient();

  const [phase, setPhase] = useState<"welcome" | "step" | "done">("welcome");
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<FormState>({
    company: profile.company ?? "",
    address: profile.address ?? "",
    kvk: profile.kvk ?? "",
    contact_person: profile.contact_person ?? "",
    phone: profile.phone ?? "",
    website_url: profile.website_url ?? "",
    contacts: (profile.contacts as Contacts) ?? {},
  });
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (profile.onboarding_status === "in_progress") {
      setStepIndex(Math.max(0, Math.min(4, profile.onboarding_step ?? 0)));
      setPhase("step");
    }
  }, []);

  const saveM = useMutation({
    mutationFn: (vars: { step: number; fields: any }) => saveStep({ data: vars }),
    onError: (e: any) => toast.error(e.message ?? "Opslaan mislukt."),
  });

  const completeM = useMutation({
    mutationFn: () => completeOnboarding({}),
    onError: (e: any) => toast.error(e.message ?? "Afronden mislukt."),
  });

  const invalidateAndClose = () => {
    qc.invalidateQueries({ queryKey: ["portal-onboarding-state"] });
    onClose();
  };

  const fieldsForStep = (idx: number, f: FormState) => {
    switch (idx) {
      case 0:
        return { company: f.company, address: f.address, kvk: f.kvk, contact_person: f.contact_person };
      case 1:
        return { phone: f.phone };
      case 2:
        return { website_url: f.website_url };
      case 3:
        return { contacts: f.contacts };
      default:
        return {};
    }
  };

  const handleNext = async () => {
    const fields = fieldsForStep(stepIndex, form);
    try {
      await saveM.mutateAsync({ step: stepIndex, fields });
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 900);
      if (stepIndex < 4) setStepIndex((s) => s + 1);
    } catch {
      // toast already shown via onError
    }
  };

  const handlePrev = () => setStepIndex((s) => Math.max(0, s - 1));

  const handleComplete = async () => {
    try {
      await completeM.mutateAsync();
      setPhase("done");
    } catch {
      // toast already shown
    }
  };

  const updateContact = (block: keyof Contacts, key: keyof ContactBlock, value: string) => {
    setForm((f) => ({ ...f, contacts: { ...f.contacts, [block]: { ...(f.contacts[block] ?? {}), [key]: value } } }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-card shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          aria-label="Later doen"
        >
          <X className="w-5 h-5" />
        </button>

        {phase === "welcome" ? (
          <WelcomeScreen onStart={() => setPhase("step")} onSkip={onClose} hasProgress={profile.onboarding_status === "in_progress"} />
        ) : phase === "done" ? (
          <DoneScreen onClose={invalidateAndClose} />
        ) : (
          <div className="p-8 space-y-6">
            <ProgressBar stepIndex={stepIndex} />
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIndex}
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                {stepIndex === 0 && <StepCompany form={form} setForm={setForm} />}
                {stepIndex === 1 && <StepContact form={form} setForm={setForm} email={profile.email} />}
                {stepIndex === 2 && <StepProject form={form} setForm={setForm} />}
                {stepIndex === 3 && <StepContacts form={form} updateContact={updateContact} />}
                {stepIndex === 4 && <StepSummary form={form} email={profile.email} />}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <button
                onClick={handlePrev}
                disabled={stepIndex === 0}
                className="btn-secondary text-sm inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" /> Vorige
              </button>
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Later doen
                </button>
                {stepIndex < 4 ? (
                  <motion.button
                    onClick={handleNext}
                    disabled={saveM.isPending}
                    animate={justSaved ? { scale: [1, 1.06, 1] } : {}}
                    transition={{ duration: 0.35 }}
                    className="btn-primary text-sm inline-flex items-center gap-1.5"
                  >
                    {justSaved ? <Check className="w-4 h-4" /> : null}
                    {saveM.isPending ? "Opslaan…" : "Volgende"}
                    {!justSaved && <ChevronRight className="w-4 h-4" />}
                  </motion.button>
                ) : (
                  <button
                    onClick={handleComplete}
                    disabled={completeM.isPending}
                    className="btn-primary text-sm inline-flex items-center gap-1.5"
                  >
                    {completeM.isPending ? "Bezig…" : "Klaar!"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WelcomeScreen({ onStart, onSkip, hasProgress }: { onStart: () => void; onSkip: () => void; hasProgress: boolean }) {
  return (
    <div className="p-10 text-center space-y-6">
      <h2 className="font-display text-2xl font-bold">Welkom bij je klantenportaal!</h2>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Fijn dat je er bent. Hier kun je je projecten volgen, wijzigingen indienen en snel contact
        met ons opnemen. Vul kort je gegevens aan zodat we je nog beter kunnen helpen.
      </p>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left">
        <div className="flex items-start gap-2">
          <LayoutGrid className="w-4 h-4 mt-0.5 text-primary shrink-0" />
          <span className="text-sm">Projecten bekijken met voortgang</span>
        </div>
        <div className="flex items-start gap-2">
          <FileText className="w-4 h-4 mt-0.5 text-primary shrink-0" />
          <span className="text-sm">Notities van ons team lezen</span>
        </div>
        <div className="flex items-start gap-2">
          <MessageSquare className="w-4 h-4 mt-0.5 text-primary shrink-0" />
          <span className="text-sm">Wijzigingen indienen en volgen</span>
        </div>
        <div className="flex items-start gap-2">
          <PhoneCall className="w-4 h-4 mt-0.5 text-primary shrink-0" />
          <span className="text-sm">Direct contact opnemen</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button onClick={onSkip} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Later doen
        </button>
        <button onClick={onStart} className="btn-primary text-sm">
          {hasProgress ? "Verder gaan" : "Laten we beginnen"}
        </button>
      </div>
    </div>
  );
}

function DoneScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-10 text-center space-y-6">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex justify-center"
      >
        <CheckCircle2 className="w-20 h-20 text-emerald-500" />
      </motion.div>
      <h2 className="font-display text-2xl font-bold">Helemaal klaar!</h2>
      <p className="text-sm text-muted-foreground">
        Bedankt voor het aanvullen van je gegevens. Je kunt nu direct aan de slag in je portaal.
      </p>
      <button onClick={onClose} className="btn-primary text-sm">Naar mijn portaal</button>
    </div>
  );
}

function ProgressBar({ stepIndex }: { stepIndex: number }) {
  const pct = Math.round(((stepIndex + 1) / 5) * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Stap {stepIndex + 1} van 5 — {STEP_TITLES[stepIndex]}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, hint }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string }) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
      {hint && <span className="block text-xs text-muted-foreground/70 mt-1">{hint}</span>}
    </label>
  );
}

function StepCompany({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm flex items-center gap-1.5"><Building2 className="w-4 h-4" />Bedrijfsgegevens</h3>
      <p className="text-xs text-muted-foreground">Zo weten we precies namens welk bedrijf we je helpen.</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Bedrijfsnaam" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
        <Field label="KvK-nummer" value={form.kvk} onChange={(v) => setForm({ ...form, kvk: v })} />
        <Field label="Adres" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
        <Field label="Contactpersoon" value={form.contact_person} onChange={(v) => setForm({ ...form, contact_person: v })} />
      </div>
    </div>
  );
}

function StepContact({ form, setForm, email }: { form: FormState; setForm: (f: FormState) => void; email?: string | null }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm flex items-center gap-1.5"><Phone className="w-4 h-4" />Contactvoorkeuren</h3>
      <p className="text-xs text-muted-foreground">Zo kunnen we je sneller bereiken als dat nodig is.</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Telefoon" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <label className="block text-sm">
          <span className="text-muted-foreground">E-mailadres (account)</span>
          <input
            value={email ?? ""}
            readOnly
            disabled
            className="mt-1 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
          />
        </label>
      </div>
    </div>
  );
}

function StepProject({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm flex items-center gap-1.5"><Globe className="w-4 h-4" />Projectgegevens</h3>
      <p className="text-xs text-muted-foreground">Met je website-URL kunnen we sneller helpen bij vragen en changes.</p>
      <Field label="Website URL" value={form.website_url} onChange={(v) => setForm({ ...form, website_url: v })} placeholder="https://" />
    </div>
  );
}

function StepContacts({ form, updateContact }: { form: FormState; updateContact: (block: keyof Contacts, key: keyof ContactBlock, value: string) => void }) {
  const blocks: { key: keyof Contacts; label: string }[] = [
    { key: "financial", label: "Financieel contact" },
    { key: "technical", label: "Technisch contact" },
    { key: "general", label: "Algemeen contact" },
  ];
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm flex items-center gap-1.5"><User className="w-4 h-4" />Extra contactpersonen</h3>
      <p className="text-xs text-muted-foreground">Optioneel — handig als anderen binnen je team met ons schakelen.</p>
      {blocks.map(({ key, label }) => (
        <div key={key} className="rounded-lg border border-border p-3 space-y-2">
          <p className="text-sm font-medium">{label}</p>
          <div className="grid sm:grid-cols-3 gap-2">
            <Field label="Naam" value={form.contacts[key]?.name ?? ""} onChange={(v) => updateContact(key, "name", v)} />
            <Field label="E-mail" value={form.contacts[key]?.email ?? ""} onChange={(v) => updateContact(key, "email", v)} />
            <Field label="Telefoon" value={form.contacts[key]?.phone ?? ""} onChange={(v) => updateContact(key, "phone", v)} />
          </div>
        </div>
      ))}
    </div>
  );
}

function StepSummary({ form, email }: { form: FormState; email?: string | null }) {
  const rows: [string, string][] = [
    ["Bedrijfsnaam", form.company || "—"],
    ["KvK", form.kvk || "—"],
    ["Adres", form.address || "—"],
    ["Contactpersoon", form.contact_person || "—"],
    ["Telefoon", form.phone || "—"],
    ["E-mail", email || "—"],
    ["Website URL", form.website_url || "—"],
  ];
  const contactBlocks: [string, ContactBlock | undefined][] = [
    ["Financieel contact", form.contacts.financial],
    ["Technisch contact", form.contacts.technical],
    ["Algemeen contact", form.contacts.general],
  ];
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Samenvatting</h3>
      <p className="text-xs text-muted-foreground">Klopt dit? Dan kun je afronden — je kunt later altijd nog wijzigen.</p>
      <dl className="text-sm space-y-1.5 rounded-lg border border-border p-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-right">{value}</dd>
          </div>
        ))}
      </dl>
      {contactBlocks.some(([, c]) => c?.name || c?.email || c?.phone) && (
        <div className="space-y-2">
          {contactBlocks.map(([label, c]) =>
            c?.name || c?.email || c?.phone ? (
              <div key={label} className="rounded-lg border border-border p-3 text-sm">
                <p className="font-medium mb-1">{label}</p>
                <p className="text-muted-foreground">{[c.name, c.email, c.phone].filter(Boolean).join(" · ") || "—"}</p>
              </div>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
