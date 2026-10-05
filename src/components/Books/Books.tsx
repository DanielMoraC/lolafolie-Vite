import { useEffect, useState } from 'react'
import type { Saga, Book } from '../../models/types'
import { BookCard } from '../BookCard/BookCard'
import './Books.scss'

interface BooksProps {
    sagasData: Saga[]
}

export function Books({ sagasData }: BooksProps) {

    const [books, setBooks] = useState<any[]>()

    useEffect(() => {
        const booksArray: any[] = []

        sagasData.forEach((saga: Saga) => {
            saga.books.forEach((book: any) => {
                book.sagaId = saga.id
                book?.publishDate && booksArray.push(book)
            })
        })

        booksArray.sort((a, b) => {
            const bDate = new Date(b.publishDate!)
            const aDate = new Date(a.publishDate!)
            return bDate.valueOf() - aDate.valueOf()
        })

        setBooks(booksArray)
    }, [sagasData])

    return <>
        <section id='books' className='books flex-col'>
            <span className='cormorant-garamond-titles italic text-2xl text-(--link-hover)'>Biblioteca</span>
            <div className='header flex-col md:flex-row'>
                <h2 className='text-5xl'>Todas las novelas</h2>
                <span className='cormorant-garamond-titles italic text-2xl text-gray-600'>{books?.length} novelas · {sagasData.length} sagas</span>
            </div>

            <div className='booksContainer overflow-x-scroll sm:overflow-x-hidden'>
                {books?.slice(0, 4).map((book: any) => {
                    return <BookCard key={book.id} book={book} sagaId={book.sagaId} />
                })}
            </div>
        </section>
    </>
}