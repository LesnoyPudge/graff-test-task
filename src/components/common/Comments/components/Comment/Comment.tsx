import { Schemas } from '@/src/model/schemas';
import { createStyles } from '@/src/utils';
import { FC } from 'react';



/*
- Имя автора комментария (name)
- Email автора (email)
- Текст комментария (body)
*/

const styles = createStyles({
    wrapper: 'grid gap-2 rounded-md bg-slate-900 p-2 text-start',
    field: 'font-bold',
});

type CommentProps = {
    comment: Schemas.Comment;
};

export const Comment: FC<CommentProps> = ({
    comment,
}) => {
    return (
        <div className={styles.wrapper}>
            <div>
                <span className={styles.field}>
                    <>Id: {comment.id}</>
                </span>
            </div>

            <div>
                <span className={styles.field}>
                    <>Имя: </>
                </span>

                <p>{comment.name}</p>
            </div>

            <div>
                <span className={styles.field}>
                    <>Email: </>
                </span>

                <p>{comment.email}</p>
            </div>

            <div>
                <span className={styles.field}>
                    <>Body: </>
                </span>

                <p>{comment.body}</p>
            </div>
        </div>
    );
};