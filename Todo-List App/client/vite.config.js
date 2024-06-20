import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // Development server configuration
  server: {
    // Proxy API requests
    proxy: {
      "/api": "http://localhost:4008", // Redirect /api requests to backend server running on localhost:4008
    },
  },
  // Plugins configuration
  plugins: [react()], // Add React plugin for Vite
});
