// eslint.config.js
import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    // For browser files (your TypeScript components)
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Browser globals
        document: "readonly",
        window: "readonly",
        HTMLElement: "readonly",
        HTMLBodyElement: "readonly",
        HTMLImageElement: "readonly",
        MouseEvent: "readonly",
        setInterval: "readonly",
        setTimeout: "readonly",
        clearInterval: "readonly",
        clearTimeout: "readonly",
        console: "readonly", // if you use console.log
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      semi: ["error", "always"],
      quotes: ["error", "single"],
      // Fix the unused expressions error (common in event handlers)
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true, allowTernary: true },
      ],
    },
  },
];
