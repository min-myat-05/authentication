import { defineConfig, loadEnv } from "vite";
import process from "node:process";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react()],
    server: {
      port: Number(env.PORT) || 5173,
      proxy: {
        // Proxy API calls to backend to avoid CORS during development
        "/api": {
          target: "http://localhost:4000",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path,
        },
      },
    },
  });
};
