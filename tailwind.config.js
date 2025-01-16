import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
        "./node_modules/flowbite/**/*.js"
    ],

    theme: {
        extend: {
            fontFamily: {
                'sans': ['Sen']
            },
            colors: {
                primary             : '#EE7828',
                primary_hover       : '#D95A03',
                primary_light       : '#FEFBF9',
                secondary           : '#2C2C2C',
                urgencies           : '#C92D2D',
                urgencies_hover     : '#9F1010',
                urgencies_active    : '#D85151',

                gray_50             : '#F5F7FA',
                gray_100            : '#EEF1F6',
                gray_200            : '#E0E5EB',
                gray_300            : '#CAD0D9',
                gray_400            : '#9CA3AF',
                gray_500            : '#6C727F',
                gray_600            : '#4E5562',
                gray_700            : '#333D4C',
                gray_800            : '#1D2735',
                gray_900            : '#030712',
                gray_950            : '#030712',
            },
            fontSize: {
                mobile_h1           : '2.5rem',
                tablet_h1           : '3.5rem',
                desktop_h1          : '4rem',
                mobile_h2           : '2rem',
                tablet_h2           : '2.5rem',
                mobile_h3           : '1.75rem',
                tablet_h3           : '2rem',
                desktop_h3          : '2.5rem',
                xxs: '0.6rem',
            },
            boxShadow: {
                cookie: '0 2px 4px 6px rgb(0 0 0 / 0.1)',
            }
        },
    },
    plugins: [
        forms,
        require('flowbite/plugin')
    ],
};
