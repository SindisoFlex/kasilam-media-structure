import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: [
      "src/test/**/*.{test,spec}.{ts,tsx}",
      "api/tests/**/*.{test,spec}.{js,ts}",
    ],
    environmentMatchGlobs: [
      ["api/tests/**/*", "node"],
    ],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
