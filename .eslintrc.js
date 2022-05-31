module.exports = {
    parser: "vue-eslint-parser",
    parserOptions: {
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    extends: [
        'plugin:vue/vue3-recommended',
    ],
    rules: {
        "vue/multi-word-component-names": "off",
        "vue/html-self-closing": "off",
        "vue/max-attributes-per-line": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/first-attribute-linebreak": "off",
        "vue/html-closing-bracket-newline": "off",
        "vue/html-indent": "off",
        "vue/no-multi-spaces": "off",
    }
}