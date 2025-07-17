// client/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

// Абсолютный путь к директории client
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async () => {
  const plugins = [react(), runtimeErrorOverlay()];

  // Подключение cartographer, если нужно
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographer());
  }

  return defineConfig({
    // Список плагинов
    plugins,

    // Alias для удобства
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    // Важно для правильного подключения CSS/JS в проде
    base: "./",

    // Корень проекта
    root: __dirname,

    // Каталог для вывода сборки
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
    },

    // Настройки dev-сервера (не нужно менять)
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  });
};