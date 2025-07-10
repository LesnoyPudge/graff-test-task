import { Button, Comments, DialogBlocks } from '@/src/components';
import { createWithDecorator } from '@lesnoypudge/utils-react';



const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    return (
        <DialogBlocks.Base.Provider
            label='Список комментариев'
            controls={controls}
        >
            <DialogBlocks.Base.Wrapper>
                {children}
            </DialogBlocks.Base.Wrapper>
        </DialogBlocks.Base.Provider>
    );
});

type CommentsViewerDialogProps = {
    postId: number;
};

export const CommentsViewerDialog = withDecorator<
    CommentsViewerDialogProps
>(({ postId }) => {
    const { closeOverlay } = DialogBlocks.useContextProxy();

    return (
        <DialogBlocks.Base.Inner>
            <DialogBlocks.Base.Header>
                <DialogBlocks.Base.Title>
                    <>Список комментариев</>
                </DialogBlocks.Base.Title>
            </DialogBlocks.Base.Header>

            <DialogBlocks.Base.Content>
                <Comments postId={postId}/>
            </DialogBlocks.Base.Content>

            <DialogBlocks.Base.Footer>
                <Button onLeftClick={closeOverlay}>
                    <>Закрыть</>
                </Button>
            </DialogBlocks.Base.Footer>
        </DialogBlocks.Base.Inner>
    );
});