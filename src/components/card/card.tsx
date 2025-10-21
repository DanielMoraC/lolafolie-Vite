// 'use client'

import { Link } from "react-router";
import type { Book } from "../../types";
import { useState } from 'react';
import './card.scss'

interface CardProps {
    sagaPage: boolean,
    saga: string,
    card: Book
}

interface SpiceProps {
    spice: number
}

export function ReadMore() {
    return (
        <>
            <span className='readMore'>Leer más...</span>
        </>
    )
}

export function Spice({ spice }: SpiceProps) {

    const [spiceLength] = useState(new Array(spice).fill(""))

    return (
        <>
            {spiceLength.map((_, index) => {
                return (
                    <img key={index} src="/chili.png" alt="Spice" className='imgChili' />
                )
            })}
        </>
    )
}

export function Card({ sagaPage, saga, card }: CardProps) {
    const [synopsis] = useState(`<p>${card.synopsis.replaceAll('|', '</p><p>')}</p>`)

    return (
        <div className='shadow-md card'>
            <div className="img">
                <Link key={card.title} to={`/book/${saga}/${card.id}`}>
                    <img src={card.img} alt={card.title} />
                </Link>
            </div>
            <div className='textsContainer'>
                <div className='cardTitleContainer'>
                    <div className='titleCategoryContainer'>
                        <Link key={card.title} to={`/book/${saga}/${card.id}`}
                            className='line-clamp-1 title font-bold text-xl'>
                            {sagaPage ? <h2 className="hover:underline">{card.title}</h2> : <h3 className="hover:underline">{card.title}</h3>}
                        </Link>
                        {sagaPage && <span className='text-gray-500 text-lg'>{card.category}</span>}
                    </div>
                    <div className='ageContainer'>
                        {sagaPage && card?.spice && <Spice spice={card?.spice}></Spice>}
                        {card?.age && <span className='age text-xs'>{card.age}</span>}
                    </div>
                </div>
                <div className='synopsis'>
                    <p>
                        <Link key={card.title} to={`/book/${saga}/${card.id}`}>
                            {/* <ReadMore></ReadMore> */}
                        </Link>
                        <span className="text-base" dangerouslySetInnerHTML={{ __html: synopsis }}></span>
                    </p>
                </div>
                <div className='buttonsContainer'>
                    <Link key={card.amazon} to={card.amazon} target="_blank">
                        <button className='button text-neutral-50'>
                            <img src="/amazon_ico.png" alt="Amazon" className='buttonImage' />
                            Amazon
                        </button>
                    </Link>
                    {card?.goodreads && <Link key={card.goodreads} to={card.goodreads} target="_blank">
                        <button className='button text-neutral-50'>
                            <img src="/goodreads_ico.png" alt="Goodreads" className='buttonImage' />
                            Goodreads
                        </button>
                    </Link>}
                </div>
            </div>
        </div>
    )
}