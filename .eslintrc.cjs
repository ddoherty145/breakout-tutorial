module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript"
  ],
  env: {
    browser: true,  // Enables browser globals like `document`, `console`, `setTimeout`
    es2021: true,
    node: true
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"]
      }
    }
  },
  globals: {
    HTMLCanvasElement: "readonly",
    HTMLButtonElement: "readonly",
    console: "readonly",
    document: "readonly",
    requestAnimationFrame: "readonly",
    setTimeout: "readonly"
  }
};
