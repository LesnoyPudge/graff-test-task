import { createStyles } from '@/src/utils';



export const styles = createStyles({
    base: `
        flex 
        h-fit 
        w-fit 
        shrink-0 
        items-center 
        justify-center
        truncate
        rounded-[3px] 
        bg-sky-500
        px-3 
        py-1 
        text-center 
        decoration-current 
        decoration-2 
        underline-offset-4 
        transition-all 
        duration-100 
        aria-[disabled=true]:cursor-not-allowed 
        aria-[disabled=true]:opacity-55
        data-[loading=true]:animate-pulse
        hover-focus-visible:bg-sky-600
    `,
});