import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import {
  defineConfig, 
} from "eslint/config";

export default defineConfig([
  { ignores: [ "dist" ] },
  {
    files: [ "**/*.{js,mjs,cjs,jsx}", ],
    plugins: {
      js,
      prettier: pluginPrettier, 
      import: eslintPluginImport,
    },
    extends: [ "js/recommended", ], 
  },
  {
    files: [ "**/*.{js,mjs,cjs,jsx}", ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    }
    
  },
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect", // Автоматически определить версию React
        runtime: "automatic", // говорит плагину, что импорт React не нужен
      },
    }, 
  },
  {
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      "no-unused-vars": "off",
      "no-undef": "error", // Предупреждение при использовании необъявленных переменных
      "semi": [ "error", "always", ], // Всегда использовать точку с запятой
      "indent": [ "warn", 2, ], // Отступ в 2 пробела
      "no-var": "warn", // Запрет на использование var
      "quotes": [ "warn", "double", ], // Использовать только двойные кавычки
      "eol-last": [ "warn", "always", ], // Требовать пустую строку в конце файла
      "no-plusplus": "off", // Разрешить использование i++
      "comma-dangle":"off", // Всегда ставить запятую после последнего элемента в списках
      "prefer-destructuring": "off", // Не требовать обязательную деструктуризацию
      "no-param-reassign": "off", // Разрешить изменять параметры функции
      "max-len": [ "warn", 150, { ignoreUrls: true, }, ], // Предупреждать при длине строки >150 символов, игнорировать URL

      "object-curly-spacing": [ "warn", "always", ], // Пробелы внутри фигурных скобок объектов: { a: 1 }
      "array-bracket-spacing": [ "warn", "always", ], // пробелы внутри массивов: [1, 2]
      "space-before-blocks": [ "warn", "always", ], // Пробел перед { блоком }: if (x) { ... }
      "arrow-spacing": [ "warn", { before: true, after: true, }, ], // Пробел до и после => в стрелочных функциях
      "keyword-spacing": [ "warn", { before: true, after: true, }, ], // Пробелы до и после ключевых слов: if, return, etc.
      "space-infix-ops": "warn",
      "spaced-comment": [ "warn", "always" ],
      "comma-spacing": [ "warn", { "before": false, "after": true } ],
      "func-call-spacing": [ "warn", "never" ],

      "no-multiple-empty-lines": [ "warn", { "max": 1 } ], 
      "object-curly-newline": [ "error", { ImportDeclaration: { multiline: true, consistent: true }, } ],
      "react/react-in-jsx-scope": "off",
      
    }, 
  }
],);
