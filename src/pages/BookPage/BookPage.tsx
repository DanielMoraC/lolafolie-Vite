import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import type { Book, Saga } from "../../types";
import './BookPage.scss'
import { Spice } from "../../components/card/card";
import { formatDateBook } from "../../hooks/date";

export function BookPage() {
    const { sagaID, bookID } = useParams()
    const navigate = useNavigate()

    const [saga, setSaga] = useState<Saga>()
    const [book, setBook] = useState<Book>()
    const [otherBooks, setOtherBooks] = useState<Book[]>()
    const [dateFormated, setDateFormated] = useState<string>()
    const [synopsis, setSynopsis] = useState<string>()

    useEffect(() => {
        getSaga()
    }, [sagaID, bookID])

    const throw404 = () => {
        navigate("/notFound");
    }

    const getSaga = async () => {
        await fetch('/config.json')
            .then(async res => {
                const data = await res.json()

                const temporalSaga = data?.sagas?.find((saga: Saga) => saga.id == sagaID)

                setSaga(temporalSaga)
                setSagaBook(temporalSaga)
            })
    }

    const setSagaBook = (temporalSaga: Saga | undefined) => {
        if (temporalSaga && temporalSaga.books && temporalSaga.books.length > 0) {
            const book = temporalSaga?.books.find((book: Book) => book.id == bookID)
            if (book) {
                setBook(book)
                setOtherBooks(temporalSaga?.books.filter((book: Book) => book.id != bookID))
            } else {
                throw404()
            }
        } else {
            throw404()
        }
    }

    useEffect(() => {
        setDateFormated(book?.publishDate && formatDateBook({ date: book?.publishDate }))
        setSynopsis(`<p>${book?.synopsis.replaceAll('|', '</p><p>')}</p>`)
        document.title = book?.title ? book.title + ' - Lola Folie' : 'Lola Folie'
        const bookPage = document.querySelector('.bookPage') as HTMLBodyElement
        bookPage?.style.setProperty('background', book?.colorUp && book?.colorDown ? 'linear-gradient(' + book?.colorUp + ', ' + book?.colorDown + ')' : 'var(--background)')
    }, [book])

    return (
        <>
            <Header />
            <div className="pageContainer">
                <div className='bookPage page'>
                    <div className="bookContainer">
                        <aside className="hidden md:block">
                            <img loading="lazy" src={book?.front} alt={book?.title} />
                            <div className='buttonsContainer'>
                                {book?.amazon && <Link key={book.amazon} to={book.amazon} target="_blank">
                                    <button className='button'>
                                        <img loading="lazy" src="/amazon_ico.png" alt="Amazon" className='buttonImage' />
                                        Amazon
                                    </button>
                                </Link>}
                                {book?.goodreads && <Link key={book.goodreads} to={book.goodreads} target="_blank">
                                    <button className='button'>
                                        <img loading="lazy" src="/goodreads_ico.png" alt="Goodreads" className='buttonImage' />
                                        Goodreads
                                    </button>
                                </Link>}
                            </div>
                            {book?.isbn && <p><span className="md:text-lg text-(--subtitle-color)">ISBN: </span><span>{book?.isbn}</span></p>}
                            {dateFormated && <p><span className="md:text-lg text-(--subtitle-color)">Fecha de publicación: </span><span className="capitalize">{dateFormated}</span></p>}
                        </aside>

                        <main className="infoBookContainer">
                            <div className="header">
                                <h1 className='text-2xl md:text-3xl font-bold'>{book?.title}</h1>
                            </div>

                            <div className="info">
                                <div className="infoBook">
                                    <Link key={saga?.id} to={`/saga/${saga?.id}`}>
                                        <span className='text-lg md:text-2xl'> {saga?.title}</span>
                                    </Link>
                                    <span className="text-lg md:text-2xl text-(--subtitle-color)">- </span>
                                    <span className="text-lg md:text-2xl text-(--subtitle-color)">{book?.category}</span>
                                    <div className="ageContainer">
                                        {book?.age && <span className='age text-(--subtitle-color)'>{book.age}</span>}
                                        {book?.spice && <Spice spice={book?.spice}></Spice>}
                                    </div>
                                </div>
                                <div className="synopsis md:text-lg" dangerouslySetInnerHTML={{ __html: synopsis! }}></div>
                            </div>

                            <div className="bookInfoSmall flex md:hidden">
                                <div className='buttonsContainer'>
                                    {book?.amazon && <Link key={book.amazon} to={book.amazon} target="_blank">
                                        <button className='button'>
                                            <img loading="lazy" src="/amazon_ico.png" alt="Amazon" className='buttonImage' />
                                            Amazon
                                        </button>
                                    </Link>}
                                    {book?.goodreads && <Link key={book.goodreads} to={book.goodreads} target="_blank">
                                        <button className='button'>
                                            <img loading="lazy" src="/goodreads_ico.png" alt="Goodreads" className='buttonImage' />
                                            Goodreads
                                        </button>
                                    </Link>}
                                </div>
                                {book?.isbn && <p><span className="text-(--subtitle-color)">ISBN: </span><span>{book?.isbn}</span></p>}
                                {dateFormated && <p><span className="text-(--subtitle-color)">Fecha de publicación: </span><span className="capitalize">{dateFormated}</span></p>}
                            </div>
                        </main>
                    </div>

                    {otherBooks && otherBooks.length > 0 ?
                        <div className="otherBooksContainer">
                            <div className='bookHeader'>
                                <h2 className='text-xl md:text-2xl'>Otros libros de la misma saga</h2>
                            </div>

                            <div className='otherBooks'>
                                {otherBooks?.map((book) => {
                                    return (
                                        <Link key={book?.title} to={`/book/${saga?.id}/${book?.id}`}>
                                            <div className="hidden md:block image">
                                                <img loading="lazy" src={book?.front} alt={book?.title} />
                                                <span className='text-lg'>{book?.title}</span>
                                            </div>

                                            <p className="md:hidden inline linkContainer">
                                                <span className='text-lg'>{book?.title} - </span>
                                                <span className='text-md text-(--subtitle-color)'>{book?.category}</span>
                                            </p>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                        : <></>}
                </div>
                <Footer backgroundColor={book?.colorDown} />
            </div>
        </>
    )
} 