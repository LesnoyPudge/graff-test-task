import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Heading } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@/src/utils';
import { FC } from 'react';



const styles = createStyles({
    base: 'text-center text-2xl font-bold',
});

export const BaseDialogBlocksTitle: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <Heading.Node className={cn(styles.base, className)}>
            {children}
        </Heading.Node>
    );
};