export function Footer() {
  return (
    <footer className="border-t border-border py-10 bg-background">
      <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.08em] text-muted-foreground">
        <div className="font-display italic text-xl text-foreground normal-case tracking-normal">
          AIMI<span className="text-primary">.</span>
        </div>
        <div>© {new Date().getFullYear()} AIMI — Built by Aidan & Milan</div>
      </div>
    </footer>
  );
}
