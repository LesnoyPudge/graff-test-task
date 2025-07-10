import { Button, Overlay } from '@/src/components';
import { Schemas } from '@/src/model/schemas';
import { Router } from '@/src/router';
import { Heading } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import newWindowIconSrc from '@/src/assets/new-window-icon.svg';
import { createStyles } from '@/src/utils';
import { CommentsViewerDialog } from './components';



/*
- Заголовок поста (title)
- Содержание поста (body)
- Кнопка "Комментарии" для открытия модального окна
- Кнопка с иконкой для открытия поста с комментариями в новой вкладке
*/

const styles = createStyles({
    wrapper: 'flex flex-col gap-2',
    title: 'line-clamp-1 font-bold',
    body: 'line-clamp-6',
    actions: 'mt-auto flex flex-wrap justify-around gap-2',
    link: 'block size-9 overflow-hidden rounded-md bg-white',
    image: 'size-full',
});

type PostCartProps = {
    post: Schemas.Post;
};

export const PostCart: FC<PostCartProps> = ({
    post,
}) => {
    const controls = Overlay.useControls();

    return (
        <article className={styles.wrapper}>
            <Heading.Node
                className={styles.title}
                title={post.title}
            >
                {post.id} - {post.title}
            </Heading.Node>

            <p
                className={styles.body}
                title={post.body}
            >
                {post.body}
            </p>

            <div className={styles.actions}>
                <Button
                    onLeftClick={controls.open}
                    hasPopup='dialog'
                >
                    <>Комментарии</>
                </Button>

                <CommentsViewerDialog
                    controls={controls}
                    postId={post.id}
                />

                <Link
                    className={styles.link}
                    to={Router.Pages.Post.getNavigatePath(post.id)}
                    aria-label='Открыть новую страницу поста'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <img
                        className='size-full bg-white'
                        src={newWindowIconSrc}
                        alt=''
                    />
                </Link>
            </div>
        </article>
    );
};