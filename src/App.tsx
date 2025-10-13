import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SagaPage from "./pages/SagaPage/SagaPage";
import { BookPage } from "./pages/BookPage/BookPage";


export default function App() {

    const router = createBrowserRouter([
        { path: '/', element: <HomePage />, errorElement: <NotFoundPage /> },
        { path: '/saga/:sagaID', element: <SagaPage />, errorElement: <NotFoundPage /> },
        { path: '/book/:sagaID/:bookID', element: <BookPage />, errorElement: <NotFoundPage /> },
        { path: '/about', element: <HomePage />, errorElement: <NotFoundPage /> },
    ])

    return (
        <RouterProvider router={router} />
    )
}