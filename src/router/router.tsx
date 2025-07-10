import { Routes, Route } from 'react-router-dom';
import { FC } from 'react';
import { ErrorBoundary } from '@lesnoypudge/utils-react';
import * as pages from './pages';
import * as Layouts from './layouts';



export namespace Router {
    export namespace Pages {
        export import Main = pages.MainPage;

        export import Post = pages.PostPage;

        export import NotFound = pages.NotFoundPage;

        export import Error = pages.ErrorPage;
    }

    export const View: FC = () => (
        <ErrorBoundary.Node FallbackComponent={Pages.Error.View}>
            <Routes>
                <Route element={<Layouts.RootLayout/>}>
                    <Route
                        path={Pages.Main.path}
                        element={<Pages.Main.View/>}
                    />

                    <Route
                        path={Pages.Post.path}
                        element={<Pages.Post.View/>}
                    />

                    <Route
                        path={Pages.NotFound.path}
                        element={<Pages.NotFound.View/>}
                    />
                </Route>
            </Routes>
        </ErrorBoundary.Node>
    );
};