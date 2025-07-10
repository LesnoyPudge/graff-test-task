import { connectLogger, createCtx } from '@reatom/framework';



export const ctx = createCtx();

if (import.meta.env.DEV) {
    connectLogger(ctx);
}