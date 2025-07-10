import { AppModel } from '@/src/model';
import { useAtom } from '@reatom/npm-react';
import { FC } from 'react';
import { If } from '@lesnoypudge/react-if';
import { PostsList, PostsListWrapper } from './component';
import { createStyles } from '@/src/utils';
import { Placeholder, Scrollable } from '@/src/components';
import { Iterate } from '@lesnoypudge/utils-react';



const PLACEHOLDER_COUNT = 6;

const styles = createStyles({
    wrapper: 'h-full text-center',
    placeholder: 'min-h-[200px]',
});

export const Posts: FC = () => {
    const [status] = useAtom(AppModel.postsResource.statusesAtom);
    const [isEmpty] = useAtom(AppModel.postsResource.isEmpty);
    const [isSearchEmpty] = useAtom((ctx) => {
        return !ctx.spy(AppModel.searchAtom).trim().length;
    });

    const shouldShowNotFound = (
        !isSearchEmpty
        && isEmpty
        && status.isFulfilled
    );

    return (
        <Scrollable className={styles.wrapper}>
            <If condition={isSearchEmpty}>
                <div>Введите заголовок, чтобы начать поиск</div>
            </If>

            <If condition={isEmpty && status.isPending}>
                <PostsListWrapper>
                    <Iterate count={PLACEHOLDER_COUNT} getKey={(v) => v}>
                        {() => <Placeholder className={styles.placeholder}/>}
                    </Iterate>
                </PostsListWrapper>
            </If>

            <If condition={status.isRejected}>
                <div>Произошла ошибка</div>
            </If>

            <If condition={shouldShowNotFound}>
                <div>Не удалось найти посты с таким заголовком</div>
            </If>

            <If condition={!isEmpty}>
                <PostsList/>
            </If>
        </Scrollable>
    );
};