import { defineConfig, UserConfigFn } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { checker } from 'vite-plugin-checker';
import { babelPluginReactIf } from '@lesnoypudge/react-if';
import { debarrelPlugin } from './vitePlugins';
import { PROJECT_NAME } from './src/vars';



// https://vite.dev/config/
const config: UserConfigFn = ({ mode }) => {
    const isProd = mode === 'production';

    return defineConfig({
        base: isProd ? PROJECT_NAME : '/',
        server: {
            port: 3_000,
        },
        preview: {
            port: 3_000,
        },
        build: {
            outDir: 'build',
            emptyOutDir: true,
        },
        plugins: [
            tsconfigPaths(),
            debarrelPlugin(),
            react({
                babel: {
                    plugins: [
                        babelPluginReactIf,
                    ],
                },
            }),
            checker({ typescript: true }),
        ],
    });
};

export default config;