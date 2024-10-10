import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/rollify/",
  server: {
    open: true,
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
}
})
