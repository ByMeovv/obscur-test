// client/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from 'node:url'; // Используем современный API для путей
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default async () => {
  const plugins = [
    react(),
    runtimeErrorOverlay(),
  ];

  // Логика для плагинов Replit остается без изменений
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographer());
  }

  return defineConfig({
    plugins,
    
    // КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ:
    // Устанавливаем базовый путь как относительный. 
    // Это заставит Vite генерировать пути вида "./assets/index.css" вместо "/assets/index.css",
    // что решает проблему на 99% хостингов.
    base: "./",

    resolve: {
      // Используем более надежный способ определения алиасов
      alias: {
        "@": fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    // Убираем 'root', так как Vite сам определит корень проекта.
    // Это избавляет от потенциальных конфликтов.

    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: false, // Отключаем source maps для production сборки
    },
    
    server: {
      host: true, // Делает dev-сервер доступным по локальной сети
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  });
};