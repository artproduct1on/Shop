import {
  defineConfig,
} from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3333",
        changeOrigin: true,
      },
      "/product_img": {
        target: "http://localhost:3333",
        changeOrigin: true,
      },
    },
    port: 3000,
  },
},);
