// Switch from Cloudflare to Node.js adapter for VPS deployment
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
      preset: "node-server",
    },
  },
  // PERF-8: splits zware libraries in aparte client-chunks zodat ze los
  // gecachet en parallel geladen worden, en niet in de hoofd-bundle belanden..
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes("node_modules")) return;
            if (id.includes("recharts") || id.includes("d3-") || id.includes("victory-vendor")) return "charts";
            if (id.includes("/motion/") || id.includes("framer-motion")) return "motion";
            if (id.includes("@dnd-kit")) return "dnd";
            if (id.includes("embla-carousel")) return "carousel";
            if (id.includes("react-day-picker")) return "daypicker";
            if (id.includes("@radix-ui")) return "radix";
          },
        },
      },
    },
  },
});
