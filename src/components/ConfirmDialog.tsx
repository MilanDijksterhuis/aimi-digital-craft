import { createContext, useCallback, useContext, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// UX-0.6 / UX-0.7: één centrale, toegankelijke vervanger voor window.confirm/
// prompt (en de losse alert-placeholders). Radix' AlertDialog levert focus-trap,
// Escape-sluiten en focus-restore gratis. Gebruik via useConfirm():
//   const { confirm, promptText } = useConfirm();
//   if (await confirm("Weet je het zeker?")) ...
//   const naam = await promptText({ label: "Naam" });  // string | null

type ConfirmOptions = {
  title?: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};

type PromptOptions = {
  title?: string;
  description?: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  inputType?: "text" | "password" | "number";
};

type ConfirmContextValue = {
  confirm: (opts: ConfirmOptions | string) => Promise<boolean>;
  promptText: (opts: PromptOptions) => Promise<string | null>;
};

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export function useConfirm(): ConfirmContextValue {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm moet binnen <ConfirmProvider> gebruikt worden");
  return ctx;
}

type PendingConfirm = { mode: "confirm"; opts: ConfirmOptions; resolve: (v: boolean) => void };
type PendingPrompt = { mode: "prompt"; opts: PromptOptions; resolve: (v: string | null) => void };
type Pending = PendingConfirm | PendingPrompt;

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<Pending | null>(null);
  const [inputValue, setInputValue] = useState("");
  const resolverRef = useRef<Pending | null>(null);

  const confirm = useCallback((opts: ConfirmOptions | string) => {
    const normalized: ConfirmOptions = typeof opts === "string" ? { description: opts } : opts;
    return new Promise<boolean>((resolve) => {
      const p: PendingConfirm = { mode: "confirm", opts: normalized, resolve };
      resolverRef.current = p;
      setPending(p);
    });
  }, []);

  const promptText = useCallback((opts: PromptOptions) => {
    return new Promise<string | null>((resolve) => {
      const p: PendingPrompt = { mode: "prompt", opts, resolve };
      resolverRef.current = p;
      setInputValue(opts.defaultValue ?? "");
      setPending(p);
    });
  }, []);

  const settle = (value: boolean | string | null) => {
    const p = resolverRef.current;
    resolverRef.current = null;
    setPending(null);
    if (!p) return;
    if (p.mode === "confirm") p.resolve(value as boolean);
    else p.resolve(value as string | null);
  };

  // Open/close via Radix: sluiten (Escape/overlay/cancel) => negatief resultaat.
  const onOpenChange = (open: boolean) => {
    if (!open) settle(pending?.mode === "prompt" ? null : false);
  };

  const isPrompt = pending?.mode === "prompt";
  const opts = pending?.opts;

  return (
    <ConfirmContext.Provider value={{ confirm, promptText }}>
      {children}
      <AlertDialog open={pending !== null} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {opts?.title ?? (isPrompt ? "Invoer vereist" : "Weet je het zeker?")}
            </AlertDialogTitle>
            {(isPrompt ? (opts as PromptOptions)?.description : (opts as ConfirmOptions)?.description) && (
              <AlertDialogDescription>
                {isPrompt ? (opts as PromptOptions).description : (opts as ConfirmOptions).description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>

          {isPrompt && (
            <div className="space-y-2">
              {(opts as PromptOptions).label && (
                <label className="text-sm font-medium">{(opts as PromptOptions).label}</label>
              )}
              <input
                autoFocus
                type={(opts as PromptOptions).inputType ?? "text"}
                value={inputValue}
                placeholder={(opts as PromptOptions).placeholder}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") settle(inputValue);
                }}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel>{opts?.cancelLabel ?? "Annuleren"}</AlertDialogCancel>
            <AlertDialogAction
              className={
                !isPrompt && (opts as ConfirmOptions)?.destructive
                  ? cn(buttonVariants({ variant: "destructive" }))
                  : undefined
              }
              onClick={(e) => {
                // Voorkom dat Radix zelf al sluit voordat we de waarde zetten.
                e.preventDefault();
                settle(isPrompt ? inputValue : true);
              }}
            >
              {opts?.confirmLabel ?? (isPrompt ? "Opslaan" : "Bevestigen")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmContext.Provider>
  );
}
