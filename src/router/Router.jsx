import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/Home"
import NotFound from "../pages/NotFounds"
import Main from "../pages/Main"
import SearchResult from "../pages/SearchResult"
import Intro from "../pages/Intro"

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <Intro /> },
                { path: '/:movieId', element: <Main /> },
                { path: '/search', element: <SearchResult /> },
                { path: '/search/:movieId', element: <SearchResult /> }
            ]
        }
    ])
    return <RouterProvider router={router} />
}