import { Comments, Scrollable } from '@/src/components';
import { PostInfo } from './components';
import { Router } from '@/src/router/router';
import { createStyles } from '@/src/utils';
import { If } from '@lesnoypudge/react-if';
import { useAtom } from '@reatom/npm-react';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'h-full',
    inner: 'flex flex-col gap-3 text-center',
});

export const PostPageView: FC = () => {
    const [status] = useAtom(Router.Pages.Post.postResource.statusesAtom);
    const [post] = useAtom(Router.Pages.Post.postResource.dataAtom);

    return (
        <Scrollable className={styles.wrapper}>
            <div className={styles.inner}>
                <If condition={!post && status.isPending}>
                    <div>Загружаем пост</div>
                </If>

                <If condition={!post && status.isRejected}>
                    <div>Произошла ошибка</div>
                </If>

                <If condition={!post && status.isFulfilled}>
                    <div>Пост не найден</div>
                </If>

                <If condition={post}>
                    {(post) => (
                        <>
                            <PostInfo post={post}/>

                            <Comments postId={post.id}/>
                        </>
                    )}
                </If>
            </div>
        </Scrollable>
    );
};