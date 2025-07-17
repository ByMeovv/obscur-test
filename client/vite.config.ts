// client/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
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
        "@": fileURLToPath(new URL('./src', import.meta.url)),  // Более надёжный способ расчёта пути
      },
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: false,  // Отключаем для production (меньше размер, нет утечек)
      rollupOptions: {
        output: {
          manualChunks: undefined,  // Предотвращаем ненужное разделение чанков
        },
      },
    },
    server: {
      host: true,  // Доступно по localhost и IP
      port: 5173,  // Фиксированный порт для dev
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
    base: "./",  // Фикс для относительных путей в production (решает проблемы со стилями/ресурсами)
    publicDir: "public",  // Явно указываем папку для статических файлов
  });
};