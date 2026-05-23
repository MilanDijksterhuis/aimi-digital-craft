import { motion } from "motion/react";
import { useState } from "react";
import { Send } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);

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

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-12 p-8 md:p-10 rounded-2xl border border-border bg-surface/80 backdrop-blur space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Naam" name="name" placeholder="Jouw naam" />
            <Field label="Email" name="email" type="email" placeholder="jij@bedrijf.nl" />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Bericht
            </label>
            <textarea
              required
              rows={5}
              placeholder="Vertel ons over je project…"
              className="mt-2 w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:glow-primary transition-all"
          >
            {sent ? "Verzonden ✓" : (<>Stuur bericht <Send className="w-4 h-4" /></>)}
          </button>
        </motion.form>
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
