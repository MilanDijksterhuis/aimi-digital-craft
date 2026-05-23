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
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
      <div className="relative mx-auto max-w-3xl px-6">
        <p className="font-mono text-xs text-primary mb-3 uppercase tracking-widest text-center">
          05 — Contact
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl md:text-6xl tracking-tight text-center"
        >
          Laten we iets <em className="not-italic text-primary">bouwen</em> samen.
        </motion.h2>
        <p className="mt-4 text-center text-muted-foreground">
          Stuur ons een bericht — we reageren binnen 24 uur.
        </p>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            role="status"
            aria-live="polite"
            className="mt-12 p-10 rounded-2xl border-2 border-primary/40 bg-surface/80 backdrop-blur text-center space-y-4"
          >
            <CheckCircle2 className="w-14 h-14 text-primary mx-auto" aria-hidden />
            <h3 className="font-display text-2xl font-semibold">Bericht verzonden!</h3>
            <p className="text-muted-foreground">
              Bedankt voor je bericht. We hebben het ontvangen en nemen binnen 24 uur contact met je op.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border hover:bg-accent text-sm font-medium transition-colors"
            >
              Nog een bericht sturen
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={onSubmit}
            className="mt-12 p-8 md:p-10 rounded-2xl border border-border bg-surface/80 backdrop-blur space-y-5"
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
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Bericht
              </label>
              <textarea
                required
                rows={5}
                placeholder="Vertel ons over je project…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2 w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:glow-primary transition-all disabled:opacity-60"
            >
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
      <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        required
        {...props}
        className="mt-2 w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
