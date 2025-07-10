import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { cn, createStyles } from '@/src/utils';
import { Overlay } from '@/src/components';
import { Motion } from '@/src/libs';
import { If } from '@lesnoypudge/react-if';



const styles = createStyles({
    popover: 'relative',
    withPointer: 'pointer-events-auto',
    withoutPointer: 'pointer-events-none',
    backdrop: `
        absolute
        inset-0 
        -z-10
        bg-black/70
    `,
    contentWrapper: 'absolute inset-0',
});

export const DialogWrapper: FC<Overlay.Dialog.Types.Wrapper.Props> = ({
    className = '',
    children,
}) => {
    const {
        dialogStyle,
        backdropStyle,
        label,
        withBackdrop,
        withoutPointerEvents,
        closeOverlay,
    } = ContextSelectable.useProxy(Overlay.Dialog.Context);

    return (
        <Overlay.BaseOverlay.Wrapper>
            <Overlay.Popover.Wrapper
                className={styles.popover}
                clickProtectorClassName={cn(
                    withoutPointerEvents && styles.withoutPointer,
                )}
            >
                <If condition={withBackdrop}>
                    <Motion.div
                        className={cn(
                            styles.backdrop,
                            withoutPointerEvents && styles.withoutPointer,
                            !withoutPointerEvents && styles.withPointer,
                        )}
                        style={backdropStyle}
                        onClick={closeOverlay}
                    >
                    </Motion.div>
                </If>

                <Motion.div
                    className={styles.contentWrapper}
                    style={dialogStyle}
                >
                    <div
                        className={cn(
                            withoutPointerEvents && styles.withoutPointer,
                            !withoutPointerEvents && styles.withPointer,
                            className,
                        )}
                        role='dialog'
                        aria-label={label}
                    >
                        {children}
                    </div>
                </Motion.div>
            </Overlay.Popover.Wrapper>
        </Overlay.BaseOverlay.Wrapper>
    );
};