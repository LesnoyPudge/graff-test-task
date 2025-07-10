import { v } from '@/src/libs';
import { Schemas } from '@/src/model/schemas';
import { POST_FETCH_LIMIT } from '@/src/vars';
import { T } from '@lesnoypudge/types-utils-base';
import { HTTP_METHODS, sleep } from '@lesnoypudge/utils';



const basePath = 'https://jsonplaceholder.typicode.com';

const request = async (
    path: string,
    options: T.Except<RequestInit, 'signal'> & {
        controller: AbortController;
    },
) => {
    const response = await fetch(path, {
        method: HTTP_METHODS.GET,
        signal: options.controller.signal,
        ...options,
    });

    if (!response.ok) throw new Error(response.statusText);

    return await response.json();
};

const createApiHandle = <
    _Value,
    _Props extends any[],
>(fn: (controller: AbortController, ...props: _Props) => _Value) => {
    return async (controller: AbortController, ...props: _Props) => {
        // extra delay
        await sleep(1_000);

        return fn(controller, ...props);
    };
};

export namespace Api {
    export const getPostsByTitle = createApiHandle(async (
        controller,
        title: string,
        page: number,
    ) => {
        const params = new URLSearchParams({
            title_like: title,
            _limit: String(POST_FETCH_LIMIT),
            _page: String(page),
        });

        const data = await request(`${basePath}/posts?${params}`, {
            controller,
        });

        return v.parse(Schemas.PostsSchema, data);
    });

    export const getPost = createApiHandle(async (
        controller,
        id: number,
    ) => {
        const data = await request(`${basePath}/posts/${id}`, {
            controller,
        });

        return v.parse(Schemas.PostSchema, data);
    });

    export const getComments = createApiHandle(async (
        controller,
        postId: number,
    ) => {
        const data = await request(`${basePath}/posts/${postId}/comments`, {
            controller,
        });

        return v.parse(Schemas.CommentsSchema, data);
    });
}