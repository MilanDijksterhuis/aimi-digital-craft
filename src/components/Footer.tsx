export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-display font-bold text-foreground">
          <span className="inline-block w-2 h-2 rounded-full bg-primary" />
          AIMI<span className="text-primary">.</span>
        </div>
        <div className="font-mono text-xs">
          © {new Date().getFullYear()} AIMI — Built by Aidan & Milan.
        </div>
      </div>
    </footer>
  );
}
