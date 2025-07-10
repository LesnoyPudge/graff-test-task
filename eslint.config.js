import { config } from '@lesnoypudge/eslint-config';
import tailwind from 'eslint-plugin-tailwindcss';



const customConfigArray = config.createConfig({
    // plugins: {
    //     "@reatom": reatom,
    // },
    settings: {
        tailwindcss: {
            callees: ['styles', 'createStyles'],
        },
    },
    rules: {
        // '@reatom/atom-rule': 'warn',
        // '@reatom/action-rule': 'warn',
        // '@reatom/reatom-prefix-rule': 'warn',
        // '@reatom/atom-postfix-rule': 'warn',
        'tailwindcss/enforces-shorthand': 'off',
        'tailwindcss/no-unnecessary-arbitrary-value': 'off',
        '@typescript-eslint/prefer-function-type': 'off',
        // 'react-refresh/only-export-components': 'off',
    },
});

// error is expected for now
const _config = config.createConfig(
    config.configs.base,
    config.configs.react,
    config.configs.web,
    config.mergeConfigs(
        // @ts-expect-error some type/version mismatch, should work fine
        ...tailwind.configs['flat/recommended'],
        config.configs.common,
        ...customConfigArray,
    ),
    config.configs.disableTypeChecked,
);

export default _config;