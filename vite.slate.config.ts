import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      // Use the SSR-free root for the static SPA build
      "@/routes/__root": path.resolve(__dirname, "src/routes/__root.spa.tsx"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
    },
  },
});
