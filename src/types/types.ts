import { T } from '@lesnoypudge/types-utils-base';
import { ComponentRef, RefObject } from 'react';



export type PropsWithInnerRef<
    _TagName extends keyof JSX.IntrinsicElements = never,
> = {
    innerRef?: (
        T.IsNever<_TagName> extends true
            ? RefObject<HTMLElement>
            : RefObject<ComponentRef<_TagName>>
    );
};

export namespace Direction {
    export type Single = 'horizontal' | 'vertical';

    export type All = 'horizontal' | 'vertical' | 'both';
}