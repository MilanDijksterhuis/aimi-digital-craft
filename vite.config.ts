// Switch from Cloudflare to Node.js adapter for VPS deployment
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
      preset: "node-server",
    },
  },
});
