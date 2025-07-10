import { Api } from './api';
import { Schemas } from './schemas';
import {
    atom,
    reatomAsync,
    reatomBoolean,
    reatomNumber,
    reatomResource,
    withAbort,
    withAssign,
    withCache,
    withDataAtom,
    withRetry,
    withStatusesAtom,
} from '@reatom/framework';
import { POST_FETCH_LIMIT } from '@/src/vars';
import { sleep } from '@lesnoypudge/utils';
import { Router } from '@/src/router';



const EMPTY_LIST: Schemas.Posts = [];

export namespace AppModel {
    export const searchAtom = atom('', 'searchAtom');

    const pageAtom = reatomNumber(1, 'pageAtom');

    searchAtom.onChange(pageAtom.reset);

    export const isAllPostsFetchedAtom = reatomBoolean(
        false,
        'isAllPostsFetchedAtom',
    );

    searchAtom.onChange(isAllPostsFetchedAtom.reset);

    export const postsResource = reatomResource<
        Schemas.Posts
    >(async (ctx) => {
        const title = ctx.spy(searchAtom);
        if (!title.trim()) return EMPTY_LIST;

        const page = ctx.spy(pageAtom);

        return await ctx.schedule(() => {
            return Api.getPostsByTitle(ctx.controller, title, page);
        });
    }, 'postsResource').pipe(
        withDataAtom(EMPTY_LIST, (_ctx, payload, state) => {
            return [...state, ...payload];
        }),
        withCache({
            length: 50,
            swr: false,
        }),
        withRetry(),
        withStatusesAtom(),
        withAssign((target, name) => ({
            isEmpty: atom((ctx) => {
                return !ctx.spy(target.dataAtom).length;
            }, `${name}.isEmpty`),
        })),
    );

    searchAtom.onChange(postsResource.dataAtom.reset);

    postsResource.onFulfill.onCall((ctx, payload) => {
        if (payload.length >= POST_FETCH_LIMIT) return;

        isAllPostsFetchedAtom.setTrue(ctx);
    });

    export const increasePage = reatomAsync(async (ctx) => {
        if (ctx.get(postsResource.statusesAtom).isPending) return;
        if (ctx.get(isAllPostsFetchedAtom)) return;

        pageAtom.increment(ctx);

        await ctx.schedule(() => sleep(50));
    }, 'increasePage').pipe(
        withAbort({ strategy: 'first-in-win' }),
    );

    export const isCacheEnabledAtom = reatomBoolean(
        false,
        'isCacheEnabledAtom',
    );

    postsResource.onCall((ctx) => {
        if (ctx.get(isCacheEnabledAtom)) return;

        postsResource.cacheAtom.reset(ctx);
    });

    export const createCommentsResource = (postId: number) => {
        const commentsResource = reatomResource(async (ctx) => {
            return await Api.getComments(ctx.controller, postId);
        }, 'commentsResource').pipe(
            withDataAtom([]),
            withRetry(),
            withStatusesAtom(),
        );

        return {
            commentsResource,
        };
    };
}