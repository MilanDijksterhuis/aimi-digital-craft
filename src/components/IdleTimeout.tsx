import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// UX-0.4: idle-gebaseerde sessietimeout i.p.v. een harde 10-min wall-clock die
// mensen midden in het typen uitlogde. De timer reset op elke interactie; een
// minuut voor het uitloggen verschijnt een waarschuwing met aftelling en een
// "Blijf ingelogd"-knop. (Vervangt tevens de UX-kant van SEC-7.)
const IDLE_MS = 15 * 60 * 1000; // 15 min inactiviteit
const WARN_MS = 60 * 1000; // waarschuwing 1 min vooraf

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];

export function IdleTimeout({ onTimeout }: { onTimeout: () => void }) {
  const [warning, setWarning] = useState(false);
  const [remaining, setRemaining] = useState(Math.round(WARN_MS / 1000));
  const lastActivity = useRef(Date.now());

  useEffect(() => {
    const onActivity = () => {
      lastActivity.current = Date.now();
    };
    ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));

    const interval = setInterval(() => {
      const idle = Date.now() - lastActivity.current;
      if (idle >= IDLE_MS) {
        onTimeout();
        return;
      }
      if (idle >= IDLE_MS - WARN_MS) {
        setWarning(true);
        setRemaining(Math.max(0, Math.ceil((IDLE_MS - idle) / 1000)));
      } else {
        setWarning(false);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, onActivity));
    };
  }, [onTimeout]);

  const stayLoggedIn = () => {
    lastActivity.current = Date.now();
    setWarning(false);
  };

  return (
    <AlertDialog open={warning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Je wordt zo uitgelogd</AlertDialogTitle>
          <AlertDialogDescription>
            Wegens inactiviteit word je over {remaining} seconde{remaining === 1 ? "" : "n"} automatisch
            uitgelogd. Klik op &laquo;Blijf ingelogd&raquo; om door te gaan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={stayLoggedIn}>Blijf ingelogd</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
