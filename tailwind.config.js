/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            colors: {
                cake: {
                    50: '#fdf3f6',
                    100: '#fbe6ec',
                    200: '#f8d4e0',
                    300: '#f3b9cd',
                    400: '#ec93b2',
                    500: '#e06f97',
                    600: '#d9527f',
                    700: '#c33d6a',
                    800: '#8a2c4c',
                    900: '#4a2436',
                },
                cream: '#fff8f5',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
                sans: ['"Poppins"', 'ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [],
};
