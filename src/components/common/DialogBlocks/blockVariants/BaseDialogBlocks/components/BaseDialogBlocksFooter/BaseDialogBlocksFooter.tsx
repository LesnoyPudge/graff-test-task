import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@/src/utils';
import { FC } from 'react';



const styles = createStyles({
    base: 'flex items-center justify-end gap-2 bg-slate-700 p-4',
});

export const BaseDialogBlocksFooter: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <div className={cn(styles.base, className)}>
            {children}
        </div>
    );
};