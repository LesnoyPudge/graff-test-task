import * as c1 from './entities';
import * as c2 from './hooks';
import * as c3 from './types';



export namespace Overlay {
    export const { useControls } = c2;

    export import Types = c3.Types;

    export import Dialog = c1.Dialog;

    export import BaseOverlay = c1.BaseOverlay;

    export import Popover = c1.Popover;

    export import Tooltip = c1.Tooltip;
}