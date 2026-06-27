export function Footer() {
  return (
    <footer className="border-t border-border py-10 bg-background">
      <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <span className="font-display font-bold text-base text-foreground tracking-tight">
          AIMI<span className="text-primary">.</span>
        </span>
        <span>© {new Date().getFullYear()} AIMI — Aidan & Milan</span>
      </div>
    </footer>
  );
}
