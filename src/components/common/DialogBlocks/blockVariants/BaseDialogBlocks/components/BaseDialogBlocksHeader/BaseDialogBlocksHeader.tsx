import { Button, DialogBlocks } from '@/src/components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@/src/utils';
import { FC } from 'react';
import { CrossIcon } from './components';



const styles = createStyles({
    wrapper: 'relative flex flex-col items-center gap-2 px-4 py-6',
    button: `
        absolute 
        right-0.5 
        top-0.5 
        h-8 
        w-8 
        fill-slate-100
        p-1 hover-focus-visible:fill-slate-300
    `,
    icon: 'h-full w-full',
});

export const BaseDialogBlocksHeader: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    const { closeOverlay } = DialogBlocks.useContextProxy();

    return (
        <div className={cn(styles.wrapper, className)}>
            {children}

            <Button
                className={styles.button}
                onLeftClick={closeOverlay}
                label='Закрыть'
            >
                <CrossIcon className={styles.icon}/>
            </Button>
        </div>
    );
};