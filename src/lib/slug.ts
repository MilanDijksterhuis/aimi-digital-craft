// Losstaand van blog.server.ts (dat @/integrations/supabase/client.server
// importeert, wat alleen server-side mag draaien) zodat dit ook client-side
// gebruikt kan worden voor de live-slugpreview in de blog-editor.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}
