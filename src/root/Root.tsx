import { FC } from 'react';
import { Providers } from './components';
import { Router } from '@/src/router';
import { ControllableStrictMode } from '@lesnoypudge/utils-react';
import '@/src/styles/global.scss';



export const Root: FC = () => {
    return (
        <ControllableStrictMode isEnabled>
            <Providers>
                <Router.View/>
            </Providers>
        </ControllableStrictMode>
    );
};