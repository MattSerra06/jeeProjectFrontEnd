import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import dns from 'dns';
import vue from '@vitejs/plugin-vue';
import cors from 'cors';

dns.setDefaultResultOrder('verbatim');

// Utilisez le middleware CORS
const corsMiddleware = cors({
    origin: 'http://localhost:8082', // Remplacez ceci par l'URL de votre application Vue.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
});

export default defineConfig({
    server: {
        host: 'localhost',
        port: 8082,
        middlewares: [corsMiddleware],
    },
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
