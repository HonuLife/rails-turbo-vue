import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/views/**/*.erb",
    "./app/frontend/**/*.vue",
    "./lib/**/*.html.erb.tt",
  ],
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
