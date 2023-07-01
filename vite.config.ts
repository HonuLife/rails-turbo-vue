import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import FullReload from "vite-plugin-full-reload";
import RubyPlugin from "vite-plugin-ruby";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    open: "http://localhost:3000",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./app/frontend", import.meta.url)),
      "~": fileURLToPath(new URL("./app", import.meta.url)),
    },
  },
  plugins: [
    vue(),
    FullReload(["config/routes.rb", "app/views/**/*"]),
    RubyPlugin(),
  ],
});
