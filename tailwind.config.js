/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx,jsx,js}","./index.htm"],
  theme: {
    extend: {
      fontFamily:{
        'montserrat':['Montserrat', 'sans-serif'],
        'poppins':['Poppins', 'sans-serif'],
        'mulish':['Mulish', 'sans-serif']
      },
      screens:{
        'micro':'300px',
        'smini':'361px',
        'mini':'389px',
        'esm':'410px',
        'vsm':'520px',
        'big':'810px',
        'super':'900px'
      }
    },
  },
  plugins: [],
}

