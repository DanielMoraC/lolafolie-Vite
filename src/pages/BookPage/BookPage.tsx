import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import type { Book, Saga } from "../../types";
import './BookPage.scss'

export function BookPage() {
    const params = useParams<{ sagaID: string, bookID: string }>()

    // const sagas = getSagas();
    const [saga, setSaga] = useState<Saga | undefined>()
    const [book, setBook] = useState<Book | undefined>()
    const [otherBooks, setOtherBooks] = useState<Book[] | undefined>()

    useEffect(() => {
        fetch('/public/config.json')
            .then(async res => res.json())
            .then(res => {
                setSaga(res.sagas.find((saga: Saga) => saga.id == params.sagaID))
            })
    }, [params])

    useEffect(() => {
        if (saga && saga.books && saga.books.length > 0) {
            setBook(saga?.books.find((book: Book) => book.id == params.bookID))
            setOtherBooks(saga?.books.filter((book: Book) => book.id != params.bookID))
            document.title = book?.title ? book.title + ' - Lola Folie' : 'Lola Folie'
        }
    }, [saga])

    return (
        <>
            <Header />
            <main className='bookPage'>
                <h2>{saga?.title}</h2>
                <h1>{book?.title}</h1>
                <p>{otherBooks ? <span>Otros libros</span> : <></>}</p>
            </main>
            <Footer />
        </>
    )
} 