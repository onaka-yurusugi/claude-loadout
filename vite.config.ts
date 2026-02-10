import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import devServer from "@hono/vite-dev-server";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    devServer({
      entry: "src/index.tsx",
      exclude: [
        /^(?!\/api\/).*/,
      ],
      injectClientScript: false,
    }),
  ],
  build: {
    outDir: "dist",
  },
  server: {
    port: 5173,
  },
});
