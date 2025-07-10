import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay } from '@/src/components';



export const PopoverContext = ContextSelectable.createContext<
    Overlay.Popover.Types.Context
>();