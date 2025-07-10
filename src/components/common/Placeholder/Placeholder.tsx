import { CSSProperties, FC } from 'react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@/src/utils';
import {
    useMergeRefs,
    useRefManager,
    useSynchronizedAnimation,
} from '@lesnoypudge/utils-react';
import { PropsWithInnerRef } from '@/src/types';



const ZERO_WIDTH_NON_JOINER = '\u200C';

const styles = createStyles({
    base: 'w-full animate-placeholder rounded-md leading-none',
});

export namespace Placeholder {
    export type Props = (
        RT.PropsWithClassName
        & PropsWithInnerRef<'div'>
        & {
            style?: CSSProperties;
        }
    );
}

export const Placeholder: FC<Placeholder.Props> = ({
    className = '',
    style,
    innerRef,
}) => {
    const elementRef = useRefManager<HTMLDivElement>(null);
    const mergedRef = useMergeRefs([elementRef, innerRef]);

    useSynchronizedAnimation(elementRef);

    return (
        <div
            className={cn(styles.base, className)}
            style={style}
            aria-busy
            aria-live='polite'
            ref={mergedRef}
        >
            {ZERO_WIDTH_NON_JOINER}
        </div>
    );
};