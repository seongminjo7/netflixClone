import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/Home"
import NotFound from "../pages/NotFounds"

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
            error: <NotFound />,
        }
    ])
    return <RouterProvider router={router} />
}