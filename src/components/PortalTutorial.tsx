import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  X, Sparkles, LayoutGrid, MessageSquare, FolderKanban, ChevronLeft, ChevronRight, PartyPopper,
} from "lucide-react";
import { portalCompleteTutorial } from "@/lib/portal.functions";

type Slide = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
};

const SLIDES: Slide[] = [
  {
    icon: Sparkles,
    title: "Welkom, korte rondleiding",
    body: "In een paar stappen laten we je zien hoe je klantenportaal werkt en waar je alles kunt vinden.",
  },
  {
    icon: LayoutGrid,
    title: "Overzicht",
    body: "Op het tabblad 'Overzicht' zie je in één oogopslag de status van je openstaande changes en de belangrijkste informatie over je account.",
  },
  {
    icon: MessageSquare,
    title: "Jouw changes",
    body: "Onder 'Jouw changes' dien je nieuwe wijzigingsverzoeken in en volg je de voortgang ervan. Je kunt hier ook reageren op updates van ons team.",
  },
  {
    icon: FolderKanban,
    title: "Mijn projecten",
    body: "Bij 'Mijn projecten' vind je een overzicht van je websites en projecten, inclusief monitoring en statusinformatie.",
  },
  {
    icon: PartyPopper,
    title: "Klaar om te starten!",
    body: "Dat was de rondleiding. Je kunt deze tutorial later altijd opnieuw laten zien via de instellingen. Veel succes met je portaal!",
  },
];

const fadeVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function PortalTutorial({ onClose }: { onClose: () => void }) {
  const completeTutorial = useServerFn(portalCompleteTutorial);
  const qc = useQueryClient();
  const [stepIndex, setStepIndex] = useState(0);

  const completeM = useMutation({
    mutationFn: () => completeTutorial({}),
    onError: (e: any) => toast.error(e.message ?? "Afronden mislukt."),
  });

  const isLast = stepIndex === SLIDES.length - 1;
  const slide = SLIDES[stepIndex];
  const Icon = slide.icon;

  const handleNext = () => {
    if (stepIndex < SLIDES.length - 1) setStepIndex((s) => s + 1);
  };
  const handlePrev = () => setStepIndex((s) => Math.max(0, s - 1));

  const handleFinish = async () => {
    try {
      await completeM.mutateAsync();
      qc.invalidateQueries({ queryKey: ["portal-tutorial-state"] });
      onClose();
    } catch {
      // toast already shown via onError
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-card shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          aria-label="Overslaan"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 space-y-6">
          <ProgressDots stepIndex={stepIndex} total={SLIDES.length} />

          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28 }}
              className="space-y-4 text-center py-6"
            >
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h2 className="font-display text-xl font-bold">{slide.title}</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">{slide.body}</p>
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
                Overslaan
              </button>
              {!isLast ? (
                <button
                  onClick={handleNext}
                  className="btn-primary text-sm inline-flex items-center gap-1.5"
                >
                  Volgende <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  disabled={completeM.isPending}
                  className="btn-primary text-sm inline-flex items-center gap-1.5"
                >
                  {completeM.isPending ? "Bezig…" : "Aan de slag"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressDots({ stepIndex, total }: { stepIndex: number; total: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Stap {stepIndex + 1} van {total}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= stepIndex ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
