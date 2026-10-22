import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Serve from the domain root by default — correct for a custom domain or any
  // host that serves the site at "/". GitHub Pages *project* sites live under
  // /<repo>/, so set VITE_BASE_PATH="/<repo>/" when deploying there, otherwise
  // the asset URLs 404 and the page renders blank.
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep heavy libraries in separate chunks so the initial
          // page load stays small.
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/scheduler")
          )
            return "react";
        },
      },
    },
  },
});
