import { FC, PropsWithChildren } from 'react';
import { cn, createStyles, getHTMLElement } from '@/src/utils';
import { createPortal } from 'react-dom';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { useMotionValue } from 'motion/react';
import { Overlay } from '@/src/components';
import { useAnimateTransition } from '@/src/hooks';
import { If } from '@lesnoypudge/react-if';



const styles = createStyles({
    wrapper: `
        pointer-events-none
        fixed
        inset-0
    `,
});

const overlay = getHTMLElement.overlayRoot();

const PortalToOverlayLayer: FC<PropsWithChildren> = ({ children }) => {
    return createPortal(children, overlay);
};

export const BaseOverlayWrapper: FC<Overlay.BaseOverlay.Types.Wrapper.Props> = ({
    className = '',
    children,
}) => {
    const {
        portalRefManager,
        isOverlayExist,
        progress,
        onEnter,
        onExit,
    } = ContextSelectable.useProxy(Overlay.BaseOverlay.Context);

    const defaultProgress = useMotionValue(2);

    const isPresent = useAnimateTransition({
        isExist: isOverlayExist,
        progress: progress ?? defaultProgress,
        onEnter,
        onExit,
    });

    return (
        <If condition={isPresent}>
            <PortalToOverlayLayer>
                <div
                    className={cn(styles.wrapper, className)}
                    ref={portalRefManager}
                >
                    {children}
                </div>
            </PortalToOverlayLayer>
        </If>
    );
};