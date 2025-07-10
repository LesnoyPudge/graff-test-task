import { variants } from './twPlugins';



/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    plugins: [
        variants(),
    ],
    theme: {
        extend: {
            screens: {
                'desktop': '1440px',
            },
            animation: {
                'placeholder': 'var(--custom-placeholder-animation)',
            },
        },
    },
};