import { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { reatomContext } from '@reatom/npm-react';
import { ctx } from '@/src/setup';
import { Heading } from '@lesnoypudge/utils-react';
import { MotionConfig } from 'motion/react';
import { PROJECT_NAME } from '@/src/vars';



const basename = import.meta.env.DEV ? '/' : PROJECT_NAME;

export const Providers: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <BrowserRouter basename={basename}>
            <reatomContext.Provider value={ctx}>
                <MotionConfig reducedMotion='user'>
                    <Heading.Provider startFrom={2}>
                        {children}
                    </Heading.Provider>
                </MotionConfig>
            </reatomContext.Provider>
        </BrowserRouter>
    );
};