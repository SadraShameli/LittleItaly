/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
const config = {
    experimental: {
        optimizeUniversalDefaults: true,
    },
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        borderRadius: {
            DEFAULT: '0.5rem',
        },
        borderColor: {
            light: colors.gray[200],
            DEFAULT: colors.gray[200],
            dark: colors.zinc[900],
        },
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
                newyork: ['NewYork'],
            },
            container: {
                center: true,
                padding: '1.75rem',
                screens: {
                    sm: '600px',
                    md: '728px',
                    lg: '980px',
                    xl: '1152px',
                },
            },
            colors: {
                hover: '#8b939b',
            },
        },
    },
    daisyui: {
        themes: [
            {
                light: {
                    primary: '#0071e3',
                    secondary: '#57534e',
                    accent: '#37CDBE',
                    neutral: '#1d1d1f',
                    'base-100': '#fff',
                    info: colors.blue[800],
                    success: colors.green[700],
                    warning: colors.yellow[800],
                    error: colors.red[600],
                },
            },
            {
                dark: {
                    primary: '#0071e3',
                    secondary: '#57534e',
                    accent: '#37CDBE',
                    neutral: '#cecece',
                    'base-100': '#000',
                    info: colors.blue[600],
                    success: colors.green[700],
                    warning: colors.yellow[700],
                    error: colors.red[600],
                },
            },
        ],
        logs: false,
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
};

module.exports = config;
