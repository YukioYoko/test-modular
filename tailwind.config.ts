import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Agregado por seguridad si tienes carpeta src
  ],
  theme: {
    extend: {
      fontFamily: {
        // La clave 'tanker' define la clase 'font-tanker'
        tanker: ['var(--tanker)', 'sans-serif'],
        satoshi: ['var(--satoshi)', 'sans-serif'],
      },
      colors: {
        // Asegúrate de no haber borrado tus colores personalizados aquí
        background: "var(--background)",
        foreground: "var(--foreground)",
        'mint-green': "var(--mint-green)",
        'dark-mint-green': "var(--dark-mint-green)",
        'dark-green': "var(--dark-green)",
        'darker-green': "var(--darker-green)",
        'militar-green': "var(--militar-green)",
        'not-white': "var(--notWhite)",
      },
    },
  },
  plugins: [],
};

export default config;