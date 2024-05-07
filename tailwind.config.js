/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgba(var(${variableName}))`;
  };
}
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      backgroundColor: {
        skin: {
          "primary-100": withOpacity("--color-primary-100"),
          "primary-60": withOpacity("--color-primary-60"),
          "secondary-100": withOpacity("--color-secondary-100"),
          "secondary-60": withOpacity("--color-secondary-60"),
        },
      },
      borderColor: {
        skin: {
          "primary-100": withOpacity("--color-primary-100"),
          "primary-60": withOpacity("--color-primary-60"),
          "secondary-100": withOpacity("--color-secondary-100"),
          "secondary-60": withOpacity("--color-secondary-60"),
        },
      },
      textColor: {
        skin: {
          "primary-100": withOpacity("--color-primary-100"),
          "primary-60": withOpacity("--color-primary-60"),
          "secondary-100": withOpacity("--color-secondary-100"),
          "secondary-60": withOpacity("--color-secondary-60"),
        },
      },
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))",
        14: "repeat(14, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
        21: "repeat(21, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
        25: "repeat(25, minmax(0, 1fr))",
        28: "repeat(28, minmax(0, 1fr))",
        42: "repeat(42, minmax(0, 1fr))",
        96: "repeat(96, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        // Simple 25 row grid
        25: "repeat(25, minmax(0, 1fr))",
        21: "repeat(21, minmax(0, 1fr))",
        42: "repeat(42, minmax(0, 1fr))",
        // Simple 24 row grid
        24: "repeat(24, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-21": "span 21 / span 21",
        "span-14": "span 14 / span 14",
      },
    },
  },
  plugins: [],
};
