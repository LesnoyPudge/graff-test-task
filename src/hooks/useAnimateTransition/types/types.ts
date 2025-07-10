import { AnimationPlaybackControlsWithThen, MotionValue } from 'motion/react';



export namespace Types {
    export type OnEnter = () => {
        then: AnimationPlaybackControlsWithThen['then'];
    };

    export type OnExit = () => {
        then: AnimationPlaybackControlsWithThen['then'];
    };

    export type Options = {
        isExist: boolean;
        progress: MotionValue;
        onEnter?: OnEnter;
        onExit?: OnExit;
    };
}