import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      host: "thanhtuyen.info.vn",
      protocol: "ws",
      clientPort: 443,
    },
  },
});
