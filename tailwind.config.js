/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B4DF7",
        secondary: "#5B36A8",
        accentPink: "#F7A8D6",
        accentBlue: "#7AB8FF",
        accentYellow: "#FFD86B",
        dark: "#222222",
        surface: "rgba(255,255,255,0.08)",
        surfaceStrong: "rgba(255,255,255,0.15)",
      },
      borderRadius: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        full: "999px",
      },
      boxShadow: {
        glow: "0 10px 40px rgba(139,77,247,0.18), 0 0 0 1px rgba(255,255,255,0.05)",
        "glow-primary":
          "0 12px 50px rgba(139,77,247,0.28), 0 0 0 1px rgba(139,77,247,0.35)",
      },
      backgroundImage: {
        "radial-spot-1":
          "radial-gradient(circle at 20% 20%, rgba(139,77,247,0.45), transparent 35%)",
        "radial-spot-2":
          "radial-gradient(circle at 75% 15%, rgba(122,184,255,0.35), transparent 40%)",
        "radial-multi":
          "radial-gradient(circle at 25% 30%, rgba(139,77,247,0.35), transparent 30%), radial-gradient(circle at 80% 20%, rgba(122,184,255,0.28), transparent 32%), radial-gradient(circle at 60% 70%, rgba(247,168,214,0.32), transparent 36%), radial-gradient(circle at 20% 80%, rgba(255,216,107,0.24), transparent 32%)",
        "conic-soft":
          "conic-gradient(from 120deg at 50% 50%, rgba(139,77,247,0.18), rgba(122,184,255,0.08), rgba(247,168,214,0.16), rgba(139,77,247,0.18))",
      },
    },
  },
  plugins: [],
};
