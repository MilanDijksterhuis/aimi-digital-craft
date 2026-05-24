import { motion } from "motion/react";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/contact.functions";

export function Contact() {
  const submit = useServerFn(submitContactForm);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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
          Stuur ons een bericht — we reageren binnen 24 uur.
        </p>

        {sent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="status"
            aria-live="polite"
            className="mt-12 p-10 rounded-lg border border-border bg-card text-center space-y-4"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={onSubmit}
            className="mt-12 p-8 md:p-10 rounded-lg border border-border bg-card space-y-5"
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
