import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath, URL } from 'node:url';

const dirname = fileURLToPath(new URL('.', import.meta.url));

export default async () => {
  const plugins = [
    react(),
    runtimeErrorOverlay(),
  ];

  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographer());
  }

  return defineConfig({
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(dirname, "src"),
      },
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      host: true,
      port: 5173,
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
    base: './', // Это ключевое изменение
    publicDir: 'public'
  });
};