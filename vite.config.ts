import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "public", // serves /public at site root
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      input: {
        main: "./index.html",
        about: "./about.html",
        contact: "./contact.html",
      },
    },
  },
  preview: {
    port: 4173,
    open: true,
  },
});
