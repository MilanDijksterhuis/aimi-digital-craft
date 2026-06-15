import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Send, CheckCircle2, Calendar, Mail } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/contact.functions";

type Mode = "choice" | "appointment" | "form";

export function Contact() {
  const submit = useServerFn(submitContactForm);
  const [mode, setMode] = useState<Mode>("choice");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const calendlyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mode !== "appointment") return;
    const url = "https://calendly.com/aimi-development-sales?primary_color=5fa7ff";
    const mount = () => {
      const el = calendlyRef.current;
      if (!el || !(window as any).Calendly) return;
      el.innerHTML = "";
      (window as any).Calendly.initInlineWidget({ url, parentElement: el });
    };
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if ((window as any).Calendly) {
      requestAnimationFrame(mount);
      return;
    }
    const s = existing ?? document.createElement("script");
    if (!existing) {
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
    s.addEventListener("load", mount, { once: true });
  }, [mode]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      await submit({ data: form });
      setForm({ name: "", email: "", message: "" });
      setSent(true);
      toast.success("Bericht verzonden", {
        description: "We nemen zo snel mogelijk contact met je op.",
      });
    } catch (err: any) {
      const msg = err?.message ?? "Verzenden mislukt. Probeer het opnieuw.";
      setError(msg);
      toast.error("Verzenden mislukt", { description: msg });
    } finally {
      setPending(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="relative mx-auto max-w-3xl px-6">
        <p className="section-label mb-4 text-center">05 — Contact</p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          Laten we iets <span className="text-primary">bouwen</span> samen.
        </motion.h2>
        <p className="mt-4 text-center text-muted-foreground">
          Kies hoe je contact wil opnemen — plan een afspraak of stuur een bericht.
        </p>

        {mode !== "choice" && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setMode("appointment")}
              className={mode === "appointment" ? "btn-primary text-[13px] !py-2 !px-4" : "btn-secondary text-[13px] !py-2 !px-4"}
            >
              <Calendar className="w-4 h-4" /> Afspraak
            </button>
            <button
              type="button"
              onClick={() => { setMode("form"); setSent(false); }}
              className={mode === "form" ? "btn-primary text-[13px] !py-2 !px-4" : "btn-secondary text-[13px] !py-2 !px-4"}
            >
              <Mail className="w-4 h-4" /> Contactformulier
            </button>
          </div>
        )}

        {mode === "choice" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 grid md:grid-cols-2 gap-5"
          >
            <button
              type="button"
              onClick={() => setMode("appointment")}
              className="group text-left p-8 rounded-lg border border-border bg-card hover:border-primary transition-colors"
            >
              <Calendar className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-xl mb-2">Plan een afspraak</h3>
              <p className="text-sm text-muted-foreground">
                Boek direct een moment in onze agenda voor een kennismaking of projectbespreking.
              </p>
            </button>
            <button
              type="button"
              onClick={() => setMode("form")}
              className="group text-left p-8 rounded-lg border border-border bg-card hover:border-primary transition-colors"
            >
              <Mail className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-xl mb-2">Stuur een bericht</h3>
              <p className="text-sm text-muted-foreground">
                Liever schrijven? Vul het contactformulier in — we reageren binnen 24 uur.
              </p>
            </button>
          </motion.div>
        )}

        {mode === "appointment" && (
          <motion.div
            key="appointment"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 rounded-lg border border-border bg-card overflow-hidden"
          >
            <div
              ref={calendlyRef}
              style={{ minWidth: 320, height: 700 }}
            />
          </motion.div>
        )}

        {mode === "form" && (
          sent ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="status"
              aria-live="polite"
              className="mt-8 p-10 rounded-lg border border-border bg-card text-center space-y-4"
            >
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto" aria-hidden strokeWidth={1.5} />
              <h3 className="text-2xl">Bericht verzonden!</h3>
              <p className="text-muted-foreground">
                Bedankt voor je bericht. We hebben het ontvangen en nemen binnen 24 uur contact met je op.
              </p>
              <button type="button" onClick={() => setSent(false)} className="btn-secondary">
                Nog een bericht sturen
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={onSubmit}
              className="mt-8 p-8 md:p-10 rounded-lg border border-border bg-card space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <Field
                  label="Naam"
                  name="name"
                  placeholder="Jouw naam"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="jij@bedrijf.nl"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-[0.12em] font-medium text-muted-foreground">
                  Bericht
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Vertel ons over je project…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full bg-background border border-border rounded text-foreground px-4 py-3 resize-none"
                />
              </div>
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
                {pending ? "Versturen…" : (<>Stuur bericht <Send className="w-4 h-4" /></>)}
              </button>
            </motion.form>
          )
        )}
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.12em] font-medium text-muted-foreground">
        {label}
      </label>
      <input
        required
        {...props}
        className="mt-2 w-full bg-background border border-border rounded text-foreground px-4 py-3"
      />
    </div>
  );
}
