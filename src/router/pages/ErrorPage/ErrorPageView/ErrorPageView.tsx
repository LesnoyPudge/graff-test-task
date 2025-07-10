import { ErrorBoundary, useFunction } from '@lesnoypudge/utils-react';
import { FC, useContext } from 'react';
import { Button } from '@/src/components';
import { createStyles } from '@/src/utils';



const styles = createStyles({
    wrapper: 'flex size-full flex-col items-center justify-center gap-5',
});

export const ErrorPageView: FC = () => {
    const context = useContext(ErrorBoundary.Context);

    const handleClick = useFunction(() => {
        if (context.counter.get() >= 3) {
            window.location.reload();
            return;
        }

        context.counter.inc();
        context.resetErrorBoundary();
    });

    return (
        <div className={styles.wrapper}>
            <div>В приложении возникла ошибка.</div>

            <Button onLeftClick={handleClick}>
                <>Перезагрузить</>
            </Button>
        </div>
    );
};