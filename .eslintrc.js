module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "google"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "indent": ["error", 2],
        "object-curly-spacing": ["off"],
        "semi": ["warn"],
        "no-unused-vars": ["warn"],
        "require-jsdoc": ["off"],
        "comma-dangle": ["off"],
        "max-len": ["off"],
        "no-invalid-this": ["warn"],
        "valid-jsdoc": ["warn"]
    }
};
