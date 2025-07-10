import { MainPageView } from './MainPageView';
import { ctx } from '@/src/setup';
import { urlAtom } from '@reatom/url';



export namespace MainPage {
    export const path = '/';

    export const navigate = () => urlAtom.go(ctx, path);

    export const View = MainPageView;
}