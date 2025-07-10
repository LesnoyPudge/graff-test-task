import { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { reatomContext } from '@reatom/npm-react';
import { ctx } from '@/src/setup';
import { Heading } from '@lesnoypudge/utils-react';
import { MotionConfig } from 'motion/react';



export const Providers: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <BrowserRouter>
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