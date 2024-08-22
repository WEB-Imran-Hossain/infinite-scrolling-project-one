// import { keepTheme } from "keep-react/keepTheme";
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
//   ],
//   presets: [keepPreset],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


import { keepTheme } from "keep-react/keepTheme";

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
}

export default keepTheme(config);
