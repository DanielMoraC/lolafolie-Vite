import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SagaPage from "./pages/SagaPage/SagaPage";
import { BookPage } from "./pages/BookPage/BookPage";
import AbountPage from "./pages/AboutPage/AboutPage";


export default function App() {

    const router = createBrowserRouter([
        { path: '/', element: <HomePage />, errorElement: <NotFoundPage /> },
        { path: '/saga/:sagaID', element: <SagaPage />, errorElement: <NotFoundPage /> },
        { path: '/book/:sagaID/:bookID', element: <BookPage />, errorElement: <NotFoundPage /> },
        { path: '/about', element: <AbountPage />, errorElement: <NotFoundPage /> },
        { path: '/notFound', element: <NotFoundPage />, errorElement: <NotFoundPage /> },
    ])

    return (
        <RouterProvider router={router} />
    )
}