import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
          '~coreui': path.resolve(__dirname, 'node_modules/@coreui/coreui')
        }
    },
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/admin.ts',
                'resources/scss/admin.scss'
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
