import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/Home"
import NotFound from "../pages/NotFounds"
import Main from "../pages/Main"

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
            error: <NotFound />,
            children: [
                { index: true, element: <Main /> },
                { path: '/:movieId', element: <Main /> }
                // : = 정해진 경로가 아니라 유동적인 거
            ]
        }
    ])
    return <RouterProvider router={router} />
}