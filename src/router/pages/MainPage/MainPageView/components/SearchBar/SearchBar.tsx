import { AppModel } from '@/src/model';
import { cn, createStyles } from '@/src/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useAtom } from '@reatom/npm-react';
import { FC } from 'react';



const styles = createStyles({
    base: `
        w-full
        max-w-full
        truncate
        rounded-md
        bg-slate-300
        p-2
        text-slate-900
        placeholder:text-slate-900/90
    `,
});

export const SearchBar: FC<RT.PropsWithClassName> = ({
    className,
}) => {
    const [search, setSearch] = useAtom(AppModel.searchAtom);

    return (
        <input
            className={cn(styles.base, className)}
            type='search'
            name='post_search'
            placeholder='Поиск постов по заголовку'
            autoComplete='off'
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
        />
    );
};