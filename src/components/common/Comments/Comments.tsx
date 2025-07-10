import { Placeholder, Scrollable } from '@/src/components';
import { Comment } from './components';
import { AppModel } from '@/src/model';
import { If } from '@lesnoypudge/react-if';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Iterate } from '@lesnoypudge/utils-react';
import { useAtom } from '@reatom/npm-react';
import { FC, useMemo } from 'react';
import { cn, createStyles } from '@/src/utils';



const PLACEHOLDER_COUNT = 6;

const styles = createStyles({
    wrapper: 'text-center',
    list: 'flex flex-col gap-5',
    placeholder: 'min-h-[150px]',
});

type CommentsProps = (
    RT.PropsWithClassName
    & {
        postId: number;
    }
);

export const Comments: FC<CommentsProps> = ({
    className,
    postId,
}) => {
    const { commentsResource } = useMemo(() => {
        return AppModel.createCommentsResource(postId);
    }, [postId]);

    const [isEmpty] = useAtom((ctx) => {
        return !ctx.spy(commentsResource.dataAtom).length;
    });

    const [status] = useAtom(commentsResource.statusesAtom);
    const [comments] = useAtom(commentsResource.dataAtom);

    return (
        <Scrollable className={cn(styles.wrapper, className)}>
            <If condition={isEmpty && status.isPending}>
                <div className={styles.list}>
                    <Iterate count={PLACEHOLDER_COUNT} getKey={(v) => v}>
                        {() => <Placeholder className={styles.placeholder}/>}
                    </Iterate>
                </div>
            </If>

            <If condition={isEmpty && status.isRejected}>
                <div>Ошибка при загрузке комментариев</div>
            </If>

            <If condition={isEmpty && status.isFulfilled}>
                <div>Комментарии не найдены</div>
            </If>

            <If condition={!isEmpty}>
                <div className={styles.list}>
                    <Iterate items={comments} getKey={(v) => v.id}>
                        {(comment) => <Comment comment={comment}/>}
                    </Iterate>
                </div>
            </If>
        </Scrollable>
    );
};