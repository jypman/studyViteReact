import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxInject: `import React from 'react'`, // jsxInject : JSX에 대한 헬퍼를 사용
  },
  plugins: [react()],
});
