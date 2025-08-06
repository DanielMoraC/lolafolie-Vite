// 'use client'

import { Link } from "react-router";
import type { Book } from "../../types";
import { useEffect, useState } from 'react';
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
    const [synopsis] = useState(card.synopsis)

    useEffect(() => {

    }, [])

    return (
        <div className='shadow-md card'>
            <div className='img'>
                <Link key={card.title} to={`/book/${saga}/${card.id}`}>
                    <img src={card.img} alt={card.title} className='img' />
                </Link>
            </div>
            <div className='textsContainer'>
                <div className='cardTitleContainer'>
                    <div className='titleCategoryContainer'>
                        <Link key={card.title} to={`/book/${saga}/${card.id}`}
                            className='line-clamp-1 title'>
                            <p>{card.title}</p>
                        </Link>
                        {sagaPage && <span className='category'>{card.category}</span>}
                    </div>
                    <div className='ageContainer'>
                        {sagaPage && <Spice spice={card?.spice}></Spice>}
                        <span className='age'>{card.age}</span>
                    </div>
                </div>
                <div className='synopsis'>
                    <p>
                        <Link key={card.title} to={`/book/${saga}/${card.id}`}>
                            <ReadMore></ReadMore>
                        </Link>
                        <span dangerouslySetInnerHTML={{ __html: synopsis }}></span>
                    </p>
                </div>
                <div className='buttonsContainer'>
                    <Link key={card.amazon} to={card.amazon} target="_blank">
                        <button className='button'>
                            <img src="/amazon_ico.png" alt="Amazon" className='buttonImage' />
                            Amazon
                        </button>
                    </Link>
                    <Link key={card.goodreads} to={card.goodreads} target="_blank">
                        <button className='button'>
                            <img src="/goodreads_ico.png" alt="Goodreads" className='buttonImage' />
                            Goodreads
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}