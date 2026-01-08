import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { globalIgnores } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import react from "eslint-plugin-react";
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixupPluginRules } from "@eslint/compat";
import typescriptParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
 baseDirectory: __dirname,
 recommendedConfig: js.configs.recommended,
 allConfig: js.configs.all
});

export default [
 ...compat.extends("eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"),
 globalIgnores(["dist"]),
 {
  plugins: {
   react,
   "simple-import-sort": simpleImportSort,
   "@typescript-eslint": typescriptEslint,
   "react-hooks": fixupPluginRules(reactHooks),
   "react-refresh": reactRefresh
  },
  rules: {
   ...react.configs.recommended.rules,
   ...react.configs["jsx-runtime"].rules,
   "react/prop-types": 0,
   "linebreak-style": 0,
   "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

   quotes: [
    2,
    "double",
    {
     avoidEscape: true
    }
   ],

   "react-hooks/exhaustive-deps": "off",
   "react/no-unescaped-entities": "off",
   semi: ["error", "always"],

   "simple-import-sort/imports": [
    "error",
    {
     groups: [
      [
       "^(assert|buffer|child_process|cluster|console|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)"
      ],
      ["^react", "^@?\\w"],
      ["^(ramda)(/.*|$)"],
      ["^(libs)(/.*|$)"],
      ["^(@mui/icons-material)(/.*|$)"],
      ["^(@mui/material)(/.*|$)"],
      ["^(theme)(/.*|$)"],
      ["^(constants)(/.*|$)"],
      ["^(pages)(/.*|$)"],
      ["^(components)(/.*|$)"],
      ["^(redux/handlers)(/.*|$)"],
      ["^(redux/reducers)(/.*|$)"],
      ["^(redux/selectors)(/.*|$)"],
      ["^(redux/listener)(/.*|$)"],
      ["^(redux/parsers)(/.*|$)"],
      ["^(redux/schemas)(/.*|$)"],
      ["^(hooks)(/.*|$)"],
      ["^(types)(/.*|$)"],
      ["^(service)(/.*|$)"],
      ["^\\u0000"],
      ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
      ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"]
     ]
    }
   ]
  },
  settings: {
   react: {
    version: "detect"
   }
  },
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
   parserOptions: {
    ecmaFeatures: {
     jsx: true
    }
   },
   globals: {
    ...globals.browser
   },
   ecmaVersion: "latest",
   parser: typescriptParser,
   sourceType: "module"
  }
 }
];
