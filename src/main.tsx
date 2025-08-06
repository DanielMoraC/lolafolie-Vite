// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import SagaPage from './pages/SagaPage/SagaPage'
import { BookPage } from './pages/BookPage/BookPage'

const router = createBrowserRouter([
  { path: '/', element: <HomePage />, errorElement: <NotFoundPage /> },
  { path: '/saga/:sagaID', element: <SagaPage /> },
  { path: '/book/:sagaID/:bookID', element: <BookPage /> },
  { path: '/about', element: <HomePage /> },
])

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
