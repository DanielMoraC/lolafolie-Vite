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
        setSynopsis(`<p>${book?.synopsis.replaceAll('|', '</p><p>')}</p>`)
        document.title = book?.title ? book.title + ' - Lola Folie' : 'Lola Folie'
    }, [book])

    return (
        <>
            <Header />
            <div className='bookPage'>
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
                        {book?.isbn && <p><span className="text-gray-500">ISBN: </span><span>{book?.isbn}</span></p>}
                        {dateFormated && <p><span className="text-gray-500">Fecha de publicación: </span><span className="capitalize">{dateFormated}</span></p>}
                    </aside>

                    <main className="infoBookContainer">
                        <div className="header">
                            <h1 className='text-2xl font-bold'>{book?.title}</h1>
                            <span className="text-lg text-gray-500">- </span>
                            <Link key={saga?.id} to={`/saga/${saga?.id}`}>
                                <span className='text-lg text-gray-500 hover:underline'> {saga?.title}</span>
                            </Link>
                        </div>

                        <div className="info">
                            <div className="infoBook">
                                <span className="text-lg text-gray-500">{book?.category}</span>
                                <div className="ageContainer">
                                    {book?.age && <span className='age'>{book.age}</span>}
                                    {book?.spice && <Spice spice={book?.spice}></Spice>}
                                </div>
                            </div>
                            <div className="synopsis" dangerouslySetInnerHTML={{ __html: synopsis! }}></div>
                        </div>
                    </main>
                </div>

                {otherBooks && otherBooks.length > 0 ?
                    <div className="otherBooksContainer">
                        <div className='bookHeader'>
                            <h2 className='text-xl'>Otros libros de la misma saga</h2>
                        </div>

                        <div className='otherBooks'>
                            {otherBooks?.map((book) => {
                                return (
                                    <Link key={book?.title} to={`/book/${saga?.id}/${book?.id}`}>
                                        <img src={book?.front} alt={book?.title} />
                                        <span className='text-lg font-bold'>{book?.title}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    : <></>}
            </div>
            <Footer />
        </>
    )
} 