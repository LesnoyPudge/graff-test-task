import { CacheToggle, Posts, SearchBar } from './components';
import { FC } from 'react';
import { createStyles } from '@/src/utils';



const styles = createStyles({
    wrapper: 'flex h-full flex-col gap-5',
});

export const MainPageView: FC = () => {
    return (
        <div className={styles.wrapper}>
            <CacheToggle/>

            <SearchBar/>

            <Posts/>
        </div>
    );
};