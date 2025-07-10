import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay } from '@/src/components';



export const {
    DialogContext,
    useDialogContextProxy,
    useDialogContextSelector,
} = ContextSelectable.createContextWithHooks<
    Overlay.Dialog.Types.Context
>().withName('Dialog');