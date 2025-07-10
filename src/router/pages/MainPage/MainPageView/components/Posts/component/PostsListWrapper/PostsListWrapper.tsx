import { cn, createStyles } from '@/src/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ComponentProps, FC } from 'react';



/*
Адаптивность (сетка с результатами поиска):
- Мобильная версия (экраны от 320px) - 3 колонки
- Планшетная версия (экраны от 768px) - 4 колонки
- Десктопная версия (экраны от 1440px) - 6 колонок
*/

// 3 колонки слишком мало, сделал более плавную прогрессию

const styles = createStyles({
    wrapper: `
        grid
        grid-cols-1
        gap-4
        px-2
        min-[420px]:grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        desktop:grid-cols-6
    `,
});

type PostsListWrapperProps = (
    RT.PropsWithChildrenAndClassName
    & ComponentProps<'div'>
);

export const PostsListWrapper: FC<PostsListWrapperProps> = ({
    className,
    children,
    ...rest
}) => {
    return (
        <div
            className={cn(styles.wrapper, className)}
            {...rest}
        >
            {children}
        </div>
    );
};