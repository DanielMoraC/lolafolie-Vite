// 'use client'

import { Link } from 'react-router'
import type { Book } from '../../models/types'
import './BookCardSaga.scss'
import { useState } from 'react'

interface CardProps {
    book: Book,
    sagaId: string,
    index: number
}

export function BookCardSaga({ book, sagaId, index }: CardProps) {

    const [synopsis] = useState(`<p>${book.synopsis.replaceAll('|', '</p><p>')}</p>`)

    return (
        <div className='cardBookSaga flex-col-reverse md:odd:flex-row md:even:flex-row-reverse p-0 md:px-[10%]'>
            <Link key={book?.title} to={`/${sagaId}/${book?.id}`} className='containerImg md:min-w-230px w-full md:w-[35%]'>
                {/* <div className='containerImg'> */}
                {/* <div> */}
                <img loading="lazy" src={book.img} alt={book.title} />
                {/* </div> */}
            </Link>

            <div className='info'>
                <span className='text-gray-500 italic'>Novela {index + 1}</span>
                <Link key={book?.title} to={`/${sagaId}/${book?.id}`}>
                    <span className='text-4xl'>{book.title}</span>
                </Link>
                <span className='text-xl text-(--subtitle-color)'>{book.category}</span>
                <span className='text-md text-gray-500'>{new Date(book.publishDate!).getFullYear()}{book.pages && <> · {book.pages} páginas</>}</span>
                <span className='text-xl synopsis' dangerouslySetInnerHTML={{ __html: synopsis }}></span>
                <div className='buttonContainer'>
                    <Link key={book.amazon} to={book.amazon}>
                        <button className='button text-xl primary'>
                            Compra ahora &#8594;
                        </button>
                    </Link>
                    <Link key={book.id} to={`/${sagaId}/${book.id}`}>
                        <button className='button text-xl tertiary'>
                            Descubre más &#8594;
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}