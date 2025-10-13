import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import type { Book, Saga } from "../../types";
import './BookPage.scss'
import { Spice } from "../../components/card/card";
import { formatDateBook } from "../../hooks/date";

export function BookPage() {
    const params = useParams<{ sagaID: string, bookID: string }>()

    // const sagas = getSagas();
    const [saga, setSaga] = useState<Saga>()
    const [book, setBook] = useState<Book>()
    const [otherBooks, setOtherBooks] = useState<Book[]>()
    const [dateFormated, setDateFormated] = useState<string>()
    const [synopsis, setSynopsis] = useState<string>()

    useEffect(() => {
        fetch('/config.json')
            .then(async res => res.json())
            .then(res => {
                setSaga(res.sagas.find((saga: Saga) => saga.id == params.sagaID))
            })
    }, [params])

    useEffect(() => {
        if (saga && saga.books && saga.books.length > 0) {
            setBook(saga?.books.find((book: Book) => book.id == params.bookID))
            setOtherBooks(saga?.books.filter((book: Book) => book.id != params.bookID))
        }
    }, [saga])

    useEffect(() => {
        setDateFormated(book?.publishDate && formatDateBook({ date: book?.publishDate }))
        setSynopsis(book?.synopsis)
        document.title = book?.title ? book.title + ' - Lola Folie' : 'Lola Folie'
    }, [book])

    return (
        <>
            <Header />
            <main className='bookPage'>
                {/* <h2>{saga?.title}</h2>
                <h1>{book?.title}</h1> */}

                <div className="bookContainer">
                    <aside>
                        <img src={book?.front} alt={book?.title} />
                        <div className='buttonsContainer'>
                            {book?.amazon && <Link key={book.amazon} to={book.amazon} target="_blank">
                                <button className='button'>
                                    <img src="/amazon_ico.png" alt="Amazon" className='buttonImage' />
                                    Amazon
                                </button>
                            </Link>}
                            {book?.goodreads && <Link key={book.goodreads} to={book.goodreads} target="_blank">
                                <button className='button'>
                                    <img src="/goodreads_ico.png" alt="Goodreads" className='buttonImage' />
                                    Goodreads
                                </button>
                            </Link>}
                        </div>
                        {book?.isbn && <p className="isbnDate">ISBN: <span>{book?.isbn}</span></p>}
                        {dateFormated && <p className="isbnDate">Fecha de publicación: <span className="capitalize">{dateFormated}</span></p>}
                    </aside>

                    <div className="infoBookContainer">
                        <div className="header">
                            <h1>{book?.title}</h1>
                            <p> - {saga?.title}</p>
                            {book?.spice && <Spice spice={book?.spice}></Spice>}
                            {book?.age && <span className='age'>{book.age}</span>}
                        </div>

                        <div className="info">
                            <p className="category">{book?.category}</p>
                            <div className="synopsis" dangerouslySetInnerHTML={{ __html: synopsis! }}></div>
                        </div>
                    </div>
                </div>

                {otherBooks && otherBooks.length > 0 ?
                    <div>
                        <div className='bookHeader'>
                            <span className='otherBook'>Otros libros de la misma saga</span>
                        </div>

                        <div className='otherBooksContainer'>
                            {/* {otherSagas?.map((saga) => {
                                    return (
                                        <Link key={saga?.title} to={`/saga/${saga?.id}`}>
                                            <div className='linkContainer'>
                                                <span className='otherSagaTitle'>{saga?.title}</span>
                                                <span className='otherSagaCategory'>{saga?.category}</span>
                                            </div>
                                        </Link>
                                    )
                                })} */}
                        </div>
                    </div>
                    : <></>}
            </main>
            <Footer />
        </>
    )
} 