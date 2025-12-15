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
                    <img loading="lazy" key={index} src="/chili.png" alt="Spice" className='imgChili' />
                )
            })}
        </>
    )
}

export function Card({ sagaPage, saga, card }: CardProps) {
    const [synopsis] = useState(`<p>${card.synopsis.replaceAll('|', '</p><p>')}</p>`)

    return (
        <>
            {/* CARDS PARA LA PANTALLA GRANDE */}
            <div className='shadow-md card hidden md:flex'>
                <div className="img">
                    <Link key={card.title} to={`/book/${saga}/${card.id}`}>
                        <img loading="lazy" src={card.img} alt={card.title} />
                    </Link>
                </div>
                <div className='textsContainer'>
                    <div className='cardTitleContainer'>
                        <div className='titleCategoryContainer'>
                            <Link key={card.title} to={`/book/${saga}/${card.id}`}
                                className='line-clamp-1 title font-bold text-xl'>
                                {sagaPage ? <h2>{card.title}</h2> : <h3>{card.title}</h3>}
                            </Link>
                            {sagaPage && <span className='text-(--subtitle-color) text-lg'>{card.category}</span>}
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
                            <span className="text-lg" dangerouslySetInnerHTML={{ __html: synopsis }}></span>
                        </p>
                    </div>
                    <div className='buttonsContainer'>
                        <Link key={card.amazon} to={card.amazon} target="_blank">
                            <button className='button text-neutral-50'>
                                <img loading="lazy" src="/amazon_ico.png" alt="Amazon" className='buttonImage' />
                                Amazon
                            </button>
                        </Link>
                        {card?.goodreads && <Link key={card.goodreads} to={card.goodreads} target="_blank">
                            <button className='button text-neutral-50'>
                                <img loading="lazy" src="/goodreads_ico.png" alt="Goodreads" className='buttonImage' />
                                Goodreads
                            </button>
                        </Link>}
                    </div>
                </div>
            </div>

            <div className="smallCard flex md:hidden">
                <div className="img">
                    <Link key={card.title} to={`/book/${saga}/${card.id}`}>
                        <img loading="lazy" src={card?.front} alt={card.title} />
                    </Link>
                </div>
                <div className='textsContainer'>
                    <Link key={card.title} to={`/book/${saga}/${card.id}`}
                        className='line-clamp-2 title text-lg'>
                        {sagaPage ? <h2 >{card.title}</h2> : <h3>{card.title}</h3>}
                    </Link>
                    <div className="buttonsContainer">
                        <Link key={card.amazon} to={card.amazon} target="_blank">
                            <button className='button text-neutral-50'>
                                <img loading="lazy" src="/amazon_ico.png" alt="Amazon" className='buttonImage' />
                                <span className="text-base">Amazon</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}