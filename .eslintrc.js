module.exports = {
  root: true,
  extends: ["universe/native"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
  overrides: [
    {
      files: ["src/**/*.{js,jsx,ts,tsx}"],
      rules: {
        "prettier/prettier": ["error", { endOfLine: "auto" }],
      },
    },
  ],
};
