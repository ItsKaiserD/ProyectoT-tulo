/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        hover_accents: "#3B82F6",
        log_background: "#1E40AF",
        up: "#059669",
        success: "#10B981",
        using: "#EA580C",
        deleting: "#DC2626",
        primary_back: "#F8FAFC",
        secondary_text: "#64748B",
        border: "#CBD5E1"
      },
      fontFamily: {
        inter: ["Inter_28pt-Regular", "sans-serif"],
        inter_bold: ["Inter_28pt-Bold", "sans-serif"],
        inter_semibold: ["Inter_28pt-SemiBold", "sans-serif"],
        inter_medium: ["Inter_28pt-Medium", "sans-serif"],
        inter_light: ["Inter_28pt-Light", "sans-serif"],
      }
    },
  },
  plugins: [],
}