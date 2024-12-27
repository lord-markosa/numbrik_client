import globals, { browser } from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
    { files: ["**/*.{js,mjs,cjs,jsx}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        ignores: [
            "**/node_modules/**",
            "webpack.config.js",
            "build/**",
            "dist/**",
            "public/**",
            "scripts/**",
            "test/**",
        ],
    },
    {
        rules: {
            "react/prop-types": "off",
        },
    },
    { env: { node: true, browser: true } },
];
