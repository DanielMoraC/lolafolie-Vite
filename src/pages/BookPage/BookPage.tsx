import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/FooterNEW/Footer";
import type { Book, Saga } from "../../models/types";
import './BookPage.scss'
import { formatDateBook } from "../../hooks/useDate";

export function BookPage() {
    const { sagaID, bookID } = useParams()
    const navigate = useNavigate()

    const [saga, setSaga] = useState<Saga>()
    const [book, setBook] = useState<Book>()
    const [dateFormated, setDateFormated] = useState<string>()
    const [synopsis, setSynopsis] = useState<string>()
    const [index, setIndex] = useState<Number>()

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
                const saga = data?.sagas?.find((saga: Saga) => saga.id == sagaID)
                setSagaBook(saga)
            })
    }

    const setSagaBook = (saga: Saga | undefined) => {
        setSaga(saga)
        if (saga?.books?.length && saga?.books?.length > 0) {
            let book: Book | undefined
            let indexBook: number | undefined
            saga?.books.forEach((bookFor: Book, i: number) => {
                if (bookFor.id == bookID) {
                    book = bookFor
                    indexBook = i
                }
            })

            if (book && (indexBook || indexBook === 0)) {
                setIndex(indexBook)
                setBook(book)
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
    }, [book])

    return (
        <>
            <Header saga={saga} book={book} />
            <div className="pageContainer">
                <main className='bookPage page'>
                    {book &&
                        <div className="bookContainer py-6 px-6 md:py-20 md:px-20 flex-col md:flex-row gap-3 md:gap-[80px]">
                            <div>
                                <img loading="lazy" src={book!.img} alt={book!.title} />
                            </div>

                            <div className='info'>
                                <span className="italic text-lg"><Link key={saga?.title} to={`/${saga?.id}`}><span className="underline">{saga?.title}</span></Link> · Novela {Number(index!) + 1}</span>
                                <h1 className='text-6xl mt-6'>{book!.title}</h1>
                                <div className="mt-5"><span className="italic text-gray-500">por </span><span className="text-lg">Lola Folie</span></div>
                                <div className='text-xl synopsis mt-6' dangerouslySetInnerHTML={{ __html: synopsis! }}></div>
                                <div className='buttonsContainer mt-6'>
                                    <Link key={book!.amazon} to={book!.amazon}>
                                        <button className='button text-xl primary'>
                                            Compra ahora &#8594;
                                        </button>
                                    </Link>
                                    {book?.goodreads && <Link key={book!.goodreads} to={book!.goodreads}>
                                        <button className='button text-xl tertiary'>
                                            Goodreads
                                        </button>
                                    </Link>}
                                </div>
                                <div className="extraInfo mt-6">
                                    {book?.publishDate && <div className="item">
                                        <span className="text-gray-500 italic">Fecha de salida</span>
                                        <span>{dateFormated}</span>
                                    </div>}
                                    {book?.pages && <div className="item">
                                        <span className="text-gray-500 italic">Páginas</span>
                                        <span>{book.pages}</span>
                                    </div>}
                                    {book?.isbn && <div className="item">
                                        <span className="text-gray-500 italic">ISBN</span>
                                        <span>{book.isbn}</span>
                                    </div>}
                                    {book?.category && <div className="item">
                                        <span className="text-gray-500 italic">Género</span>
                                        <span>{book.category}</span>
                                    </div>}
                                </div>
                            </div>
                        </div>}
                </main>
                <Footer />
            </div>
        </>
    )
} 