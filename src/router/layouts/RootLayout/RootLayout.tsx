import { Router } from '@/src/router';
import { createStyles } from '@/src/utils';
import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';



const styles = createStyles({
    wrapper: 'flex h-full flex-col',
    nav: 'px-4 py-6 text-center',
    link: `
        underline 
        underline-offset-4 
        hover-focus-visible:opacity-75
    `,
    content: 'grow overflow-hidden p-4',
});

export const RootLayout: FC = () => {
    return (
        <div className={styles.wrapper}>
            <nav className={styles.nav}>
                <Link
                    className={styles.link}
                    to={Router.Pages.Main.path}
                >
                    <>На главную</>
                </Link>
            </nav>

            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    );
};