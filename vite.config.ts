import { defineConfig } from "vite"

import viteTailwindcss from "@tailwindcss/vite"
import viteReact from "@vitejs/plugin-react"
import viteTsconfigPaths from "vite-tsconfig-paths"

const PORT = 7378
const { TAURI_DEV_HOST, TAURI_ENV_PLATFORM, TAURI_ENV_DEBUG } = process.env

export default defineConfig({
  root: "src/vite",
  publicDir: "../../public",
  envPrefix: ["VITE_", "TAURI_ENV_*"],
  clearScreen: false,
  plugins: [viteReact(), viteTailwindcss(), viteTsconfigPaths()],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    target: TAURI_ENV_PLATFORM === "windows" ? "chrome105" : "safari13",
    minify: !TAURI_ENV_DEBUG ? "esbuild" : false,
    sourcemap: !!TAURI_ENV_DEBUG,
  },
  server: {
    port: PORT,
    strictPort: true,
    host: TAURI_DEV_HOST ?? false,
    hmr: TAURI_DEV_HOST
      ? { protocol: "ws", host: TAURI_DEV_HOST, port: PORT + 1 }
      : undefined,
  },
})
