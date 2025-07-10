import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { styles } from './Button.styles';
import { useFunction } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { PropsWithInnerRef } from '@/src/types';
import { cn } from '@/src/utils';



export namespace Button {
    export type Props = T.Simplify<
        RT.PropsWithChildrenAndClassName
        & PropsWithInnerRef<'button'>
        & {
            id?: string;
            type?: 'button' | 'submit' | 'reset';
            isActive?: boolean;
            isDisabled?: boolean;
            isLoading?: boolean;
            tabIndex?: number;
            label?: string;
            controls?: string;
            hasPopup?: 'dialog' | 'menu';
            role?: 'button' | 'menuitem' | 'tab';
            hidden?: boolean;
            onAnyClick?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
            onLeftClick?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
            onMiddleClick?: React.MouseEventHandler;
            onRightClick?: React.MouseEventHandler;
            onMouseEnter?: React.MouseEventHandler;
            onFocus?: React.FocusEventHandler;
        }
    >;
}

export const Button: FC<Button.Props> = ({
    className = '',
    id,
    type = 'button',
    isActive = false,
    isDisabled = false,
    isLoading = false,
    tabIndex = 0,
    label,
    controls,
    hasPopup,
    role = 'button',
    hidden = false,
    children,
    innerRef,
    onAnyClick,
    onLeftClick,
    onMiddleClick,
    onRightClick,
    onMouseEnter,
    onFocus,
}) => {
    const withExpanded = !!hasPopup;
    const withPressed = role === 'button';
    const withSelected = role === 'tab';

    const isExpanded = withExpanded && isActive;
    const isPressed = withPressed && isActive;
    const isSelected = withSelected && isActive;
    const validTabIndex = hidden ? -1 : tabIndex;
    const disabledState = isDisabled || isLoading;

    const handleLeftClickWithKeyboard: (
        React.KeyboardEventHandler
    ) = useFunction((e) => {
        if (e.code !== 'Enter' && e.code !== 'Space') return;

        handleLeftClick(e);
    });

    const handleLeftClick = useFunction((
        e: React.MouseEvent | React.KeyboardEvent,
    ) => {
        if (!onAnyClick && !onLeftClick) return;

        e.preventDefault();

        if (disabledState) return;
        if (onLeftClick) return onLeftClick(e);
        if (onAnyClick) return onAnyClick(e);
    });

    const handleRightClick: React.MouseEventHandler = useFunction((e) => {
        if (!onAnyClick && !onRightClick) return;

        e.preventDefault();

        if (disabledState) return;
        if (onRightClick) return onRightClick(e);
        if (onAnyClick) return onAnyClick(e);
    });

    const handleMiddleClick: React.MouseEventHandler = useFunction((e) => {
        if (!onAnyClick && !onMiddleClick) return;
        if (e.button !== 1) return;

        e.preventDefault();

        if (disabledState) return;
        if (onMiddleClick) return onMiddleClick(e);
        if (onAnyClick) return onAnyClick(e);
    });

    const middleClickFix: React.MouseEventHandler = useFunction((e) => {
        if (!onAnyClick && !onMiddleClick) return;
        if (e.button !== 1) return;

        e.preventDefault();
    });

    return (
        <button
            className={cn(styles.base, className)}
            id={id}
            type={type}
            data-active={isActive}
            data-disabled={disabledState}
            data-loading={isLoading}
            tabIndex={validTabIndex}
            aria-label={label}
            aria-pressed={isPressed}
            aria-expanded={isExpanded}
            aria-selected={isSelected}
            aria-haspopup={hasPopup}
            aria-controls={controls}
            aria-hidden={hidden}
            aria-disabled={disabledState}
            role={role}
            ref={innerRef}
            onKeyDown={handleLeftClickWithKeyboard}
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
            onAuxClick={handleMiddleClick}
            onFocus={onFocus}
            onMouseEnter={onMouseEnter}
            onMouseDown={middleClickFix}
        >
            {children}
        </button>
    );
};