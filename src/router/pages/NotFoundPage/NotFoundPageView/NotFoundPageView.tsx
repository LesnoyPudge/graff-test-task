import { Router } from '@/src/router';
import { createStyles } from '@/src/utils';
import { FC } from 'react';
import { Link } from 'react-router-dom';



const styles = createStyles({
    wrapper: 'flex size-full flex-col items-center justify-center gap-5',
});


export const NotFoundPageView: FC = () => {
    return (
        <div className={styles.wrapper}>
            <div>Страница не найдена.</div>

            <Link to={Router.Pages.Main.path}>
                <>Вернуться на главную</>
            </Link>
        </div>
    );
};