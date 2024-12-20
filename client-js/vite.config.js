import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    root: "./", // Specify the root folder where index.html is located
    plugins: [react()],
    server: {
        port: 3000,
    },
});
