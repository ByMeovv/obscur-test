import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath, URL } from 'node:url';

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
        "@": path.resolve(fileURLToPath(new URL('.', import.meta.url)), "src"),
      },
    },
    root: path.resolve(__dirname, 'client'),  // Установите корень проекта, если необходимо
    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: false, // Для production
      rollupOptions: {
        output: {
          manualChunks: undefined, // Это может предотвратить ненужное разделение чанков
        },
      },
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
    base: './', // Это важно для корректного поведения в production, если проект не в корне домена
  });
};