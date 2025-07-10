import { Placeholder } from '@/src/components';
import { AppModel } from '@/src/model';
import { createStyles } from '@/src/utils';
import { Iterate } from '@lesnoypudge/utils-react';
import { useAction } from '@reatom/npm-react';
import { FC, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';



const PLACEHOLDER_COUNT = 6;

const styles = createStyles({
    node: 'min-h-[200px]',
});

const PlaceholderNode: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const increasePage = useAction(AppModel.increasePage);
    const isInView = useInView(ref);

    useEffect(() => {
        if (!isInView) return;

        // increase when in view
        void increasePage();

        // if we stick to the bottom, we need to keep increasing page
        const id = setInterval(() => {
            void increasePage();
        }, 500);

        return () => {
            clearInterval(id);
        };
    }, [isInView, increasePage]);

    return (
        <Placeholder
            className={styles.node}
            innerRef={ref}
        />
    );
};

export const PostCartPlaceholder: FC = () => {
    return (
        <Iterate count={PLACEHOLDER_COUNT} getKey={(v) => v}>
            {() => <PlaceholderNode/>}
        </Iterate>
    );
};