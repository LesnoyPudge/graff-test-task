import { AppModel } from '@/src/model';
import { createStyles } from '@/src/utils';
import { useAtom } from '@reatom/npm-react';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'flex gap-2',
});

export const CacheToggle: FC = () => {
    const [isCacheEnabled, setValue] = useAtom(AppModel.isCacheEnabledAtom);

    const text = isCacheEnabled ? 'Включён' : 'Выключен';

    return (
        <label className={styles.wrapper}>
            <>Кэш запросов: {text}</>

            <input
                type='checkbox'
                name='cache_toggle'
                checked={isCacheEnabled}
                onChange={(e) => setValue(e.currentTarget.checked)}
            />
        </label>
    );
};