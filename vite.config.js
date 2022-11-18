import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx(),
        AutoImport({
            // targets to transform
            include: [
                /\.[tj]sx?$/,
                /\.vue$/,
                /\.vue\?vue/,
                /\.md$/,
            ],

            // global imports to register
            imports: [
                // 插件预设支持导入的api
                'vue',
                'vue-router',
                'pinia',
                // 自定义导入的api
            ],

            // Generate corresponding .eslintrc-auto-import.json file.
            // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
            eslintrc: {
                enabled: false, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },

            // Filepath to generate corresponding .d.ts file.
            // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
            // Set `false` to disable.
            dts: './auto-imports.d.ts',
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // vite 相关配置
    server: {
        port: 5173,
        host: true,
        open: true,
        proxy: {
            // https://cn.vitejs.dev/config/#server-proxy
            '/dev-api': {
                target: 'http://localhost:5173',
                changeOrigin: true,
                rewrite: (p) => p.replace(/^\/dev-api/, '')
            }
        }
    },
    transpileDependencies: [
        /\bvue-awesome\b/
    ],
})
