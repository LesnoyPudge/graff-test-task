import { noop } from '@lesnoypudge/utils';
import { useConst, useForceUpdate, useLatest } from '@lesnoypudge/utils-react';
import { useEffect, useMemo } from 'react';
import { AnimateTransitionInstance } from './instance';
import { Types } from './types';



export namespace useAnimateTransition {
    export type OnEnter = Types.OnEnter;

    export type OnExit = Types.OnExit;
}

export const useAnimateTransition = ({
    isExist,
    progress,
    onEnter,
    onExit,
}: Types.Options) => {
    const instance = useConst(() => {
        return new AnimateTransitionInstance({
            isExist,
            progress,
        });
    });

    const { forceUpdate, forcedState } = useForceUpdate();
    const onEnterRef = useLatest(onEnter);
    const onExitRef = useLatest(onExit);

    const isPresent = useMemo(() => {
        // keep forcedState in useMemo deps
        noop(forcedState);

        return instance.derive({
            isExist,
            progress,
            onEnter: onEnterRef.current,
            onExit: onExitRef.current,
        });
    }, [
        instance,
        isExist,
        onEnterRef,
        onExitRef,
        progress,
        forcedState,
    ]);

    // subscribe only on exitEnd
    useEffect(() => {
        return instance.onChange(() => {
            if (instance.getIsPresent()) return;

            forceUpdate();
        });
    }, [forceUpdate, instance]);

    return isPresent || isExist;
};