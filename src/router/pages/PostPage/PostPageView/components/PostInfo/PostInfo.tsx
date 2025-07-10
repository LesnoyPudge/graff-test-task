import { Schemas } from '@/src/model/schemas';
import { createStyles } from '@/src/utils';
import { Heading } from '@lesnoypudge/utils-react';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'p-3',
    title: 'font-bold',
});

type PostInfoProps = {
    post: Schemas.Post;
};

export const PostInfo: FC<PostInfoProps> = ({
    post,
}) => {
    return (
        <div className={styles.wrapper}>
            <Heading.Node className={styles.title}>
                <>{post.id} - {post.title}</>
            </Heading.Node>

            <p>{post.body}</p>
        </div>
    );
};