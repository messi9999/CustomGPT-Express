/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        butteryCookies: ["ButteryCookies"],
        chocolateGrande: ["ChocolateGrande"],
        christmasSpark: ["ChristmasSpark"],
        rhythmicHits: ["RhythmicHits"],
        rusticShine: ["RusticShine"],
        theolaKids: ["TheolaKids"],
        oswald: ["Oswald"],
        quicksSweetLove: ["QuicksSweetLove"]
      },
      backgroundImage: (theme) => ({
        "opacity-gradient":
          "linear-gradient(to top, rgba(247, 242, 233, 0), rgba(247, 242, 233, 1))"
      })
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thumb": {
          // CSS for the scrollbar thumb (draggable part)
          "&::-webkit-scrollbar": {
            width: "12px"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#d1d5db",
            borderRadius: "9999px",
            border: "3px solid #f3f4f6"
          }
        },
        ".scrollbar-track": {
          // CSS for the scrollbar track (background)
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f7f2e9"
          },
          "scrollbar-width": "thin",
          "scrollbar-color": "#d1d5db #f3f4f6"
        }
      };
      addUtilities(newUtilities);
    })
  ]
};
