import { v } from '@/src/libs';
import { PostPageView } from './PostPageView';
import { ctx } from '@/src/setup';
import {
    atom,
    reatomResource,
    withDataAtom,
    withRetry,
    withStatusesAtom,
} from '@reatom/framework';
import { urlAtom } from '@reatom/url';
import { matchPath } from 'react-router-dom';
import { Api } from '@/src/model/api';



export namespace PostPage {
    export const path = '/post/:id';

    export const getNavigatePath = (id: number) => {
        return `/post/${id}`;
    };

    export const navigate = (id: number) => {
        urlAtom.go(ctx, getNavigatePath(id));
    };

    export const View = PostPageView;

    const ParamsSchema = v.object({
        id: v.pipe(
            v.string(),
            v.transform(Number),
            v.integer(),
            v.minValue(1),
        ),
    });

    const paramsAtom = atom((ctx) => {
        const url = ctx.spy(urlAtom).pathname;
        const match = matchPath(path, url);
        const parsed = v.safeParse(ParamsSchema, match?.params);

        if (!parsed.success) return null;

        return parsed.output;
    });

    export const postResource = reatomResource(async (ctx) => {
        const params = ctx.spy(paramsAtom);
        if (!params) return;

        return await Api.getPost(ctx.controller, params.id);
    }, 'postResource').pipe(
        withDataAtom(),
        withRetry(),
        withStatusesAtom(),
    );
}