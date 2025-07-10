import { cn, createStyles } from '@/src/utils';
import { FC } from 'react';
import { Scrollable } from '@/src/components';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



const styles = createStyles({
    inner: `
        pointer-events-auto
        flex
        max-h-[90dvh]
        w-[min(440px,100%)]
        flex-col 
        rounded 
        bg-slate-700 
        shadow-md
        [@media(max-width:440px)]:max-h-[100dvh]
        [@media(max-width:440px)]:rounded-none
    `,
    content: 'flex max-h-full flex-col justify-between',
});

export const BaseDialogBlocksInner: FC<
    RT.PropsWithChildrenAndClassName
> = ({
    className = '',
    children,
}) => {
    return (
        <div className={cn(styles.inner, className)}>
            <Scrollable
                size='small'
                withoutGutter
            >
                <div className={styles.content}>
                    {children}
                </div>
            </Scrollable>
        </div>
    );
};