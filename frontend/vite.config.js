import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // para aceptar conexiones externas
    allowedHosts: true, // habilita cualquier subdominio de ngrok
  },
});
