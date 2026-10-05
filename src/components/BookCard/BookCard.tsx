// 'use client'

import { Link } from 'react-router'
import type { Book } from '../../models/types'
import './BookCard.scss'

interface CardProps {
    book: Book,
    sagaId: string
}

export function BookCard({ book, sagaId }: CardProps) {

    return (
        <div className='cardBook min-w-9/10 sm:min-w-3/10'>
            <Link key={book?.title} to={`/${sagaId}/${book?.id}`}>
                <div className='containerImg'>
                    <img loading="lazy" src={book.img} alt={book.title} />
                </div>
            </Link>

            <div className='info'>
                <Link key={book?.title} to={`/${sagaId}/${book?.id}`}>
                    <span className='text-3xl'>{book.title}</span>
                </Link>
                <span className='text-xl text-gray-500'><span className='text-(--subtitle-color)'>{book.category}</span> · {new Date(book.publishDate!).getFullYear()}</span>
            </div>
        </div>
    )
}