import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    ...eslintPluginAstro.configs['flat/recommended'],
    ...eslintPluginVue.configs['flat/recommended'],
    eslintConfigPrettier,
    {
        rules: {
            'vue/multi-word-component-names': 'off',
        },
    },
];
