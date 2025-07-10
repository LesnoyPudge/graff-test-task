import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@/src/utils';
import { FC } from 'react';



const styles = createStyles({
    base: 'text-center',
});

export const BaseDialogBlocksSubtitle: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <div className={cn(styles.base, className)}>
            {children}
        </div>
    );
};