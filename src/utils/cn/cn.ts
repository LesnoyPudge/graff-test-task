import { clsx } from 'clsx';
import {
    createTailwindMerge,
    getDefaultConfig,
    mergeConfigs,
} from 'tailwind-merge';



// https://github.com/dcastil/tailwind-merge
const customTwMerge = createTailwindMerge(
    getDefaultConfig,
    (config) => mergeConfigs(config, {}),
);

type Args = Parameters<typeof clsx>;
// type Args = (string | boolean | undefined)[];

export const cn = (...args: Args): string => {
    return customTwMerge(clsx(args.filter(Boolean)));
};