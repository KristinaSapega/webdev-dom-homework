import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/**', 'dist/**'], // Игнорировать эти директории
  },
  {
    files: ['**/*.{js,jsx}'], // Применять правила ко всем JS и JSX файлам
    languageOptions: {
      ecmaVersion: 2021, // Использовать ECMAScript 2021
      sourceType: 'module', // Поддержка модулей ES6
    },
    plugins: {
      prettier: eslintPluginPrettier, // Подключение плагина Prettier
    },
    rules: {
      ...eslintConfigPrettier.rules, // Отключить конфликты с Prettier
      'prettier/prettier': 'error', // Ошибка при несоответствии Prettier
      'no-console': 'off', // Предупреждать при использовании console.log
      'no-unused-vars': 'warn', // Предупреждать о неиспользуемых переменных
      'eqeqeq': 'error', // Требовать использования строгого равенства (===)
    },
  },
];
