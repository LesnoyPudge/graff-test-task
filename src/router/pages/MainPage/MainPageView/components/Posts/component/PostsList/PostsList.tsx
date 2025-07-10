import { AppModel } from '@/src/model';
import { PostCart, PostCartPlaceholder } from './components';
import { Iterate } from '@lesnoypudge/utils-react';
import { useAtom } from '@reatom/npm-react';
import { FC } from 'react';
import { If } from '@lesnoypudge/react-if';
import { PostsListWrapper } from '../PostsListWrapper';



export const PostsList: FC = () => {
    const [posts] = useAtom(AppModel.postsResource.dataAtom);
    const [isAllPostsFetched] = useAtom(AppModel.isAllPostsFetchedAtom);

    return (
        <PostsListWrapper
            role='feed'
            aria-busy
            aria-label='Список постов'
        >
            <Iterate items={posts} getKey={(v) => v.id}>
                {(post) => <PostCart post={post}/>}
            </Iterate>

            <If condition={!isAllPostsFetched}>
                <PostCartPlaceholder/>
            </If>
        </PostsListWrapper>
    );
};