import { v } from '@/src/libs';



export namespace Schemas {
    export const PostSchema = v.object({
        userId: v.number(),
        id: v.number(),
        title: v.string(),
        body: v.string(),
    });

    export type Post = v.InferOutput<typeof PostSchema>;

    export const PostsSchema = v.array(PostSchema);

    export type Posts = v.InferOutput<typeof PostsSchema>;

    export const CommentSchema = v.object({
        postId: v.number(),
        id: v.number(),
        body: v.string(),
        name: v.string(),
        email: v.string(),
    });

    export type Comment = v.InferOutput<typeof CommentSchema>;

    export const CommentsSchema = v.array(CommentSchema);

    export type Comments = v.InferOutput<typeof CommentsSchema>;
}