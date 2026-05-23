import { createFileRoute, Outlet, redirect, Link, useNavigate } from "@tanstack/react-router";
import { useAuth, AuthProvider } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <AuthProvider>
      <Inner />
    </AuthProvider>
  );
}

function Inner() {
  const { user, loading, signOut } = useAuth();
  const nav = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Laden…
      </div>
    );
  }
  if (!user) {
    // client redirect (SPA)
    nav({ to: "/login" });
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-display font-bold tracking-tight">
            AIMI<span className="text-primary">.</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/portal" className="hover:text-primary">Portaal</Link>
            <Link to="/admin" className="hover:text-primary">Admin</Link>
            <span className="text-muted-foreground hidden sm:inline">{user.email}</span>
            <button
              onClick={async () => {
                await signOut();
                nav({ to: "/login" });
              }}
              className="rounded-full border border-border px-3 py-1.5 hover:bg-accent"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
