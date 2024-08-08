
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
<<<<<<< HEAD
    require('tailwind-scrollbar'),
=======
    require('tailwind-scrollbar')
>>>>>>> ba9bad0a247673e6c230f34961babbe879fb2b83
  ],
}
