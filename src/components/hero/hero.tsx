import { Link } from "react-router";
import './hero.scss'
import type { HeroDataComponent } from "../../types";
import { useState } from "react";

interface HeroProps {
    heroData: HeroDataComponent
}

export function Hero({ heroData }: HeroProps) {

    /* const [synopsis] = useState(`<p>${heroData.heroBook.synopsis.split('|', 4).join('</p><p>')}</p>`) */
    const [synopsis] = useState(`<p>${heroData.heroBook.synopsis.split('|', 3).join('</p><p>')}</p>`)

    return <>
        <div className="hero p-6 md:p-8" style={{ background: `linear-gradient(134deg, ${heroData.colorUp}, ${heroData.colorDown})` }}>
            <div className="info w-dvw md:w-3xl">
                <h3 className="text-4xl md:text-5xl mb-5">ÚLTIMO LANZAMIENTO</h3>

                <div className="img">
                    <Link key={heroData.heroBook.title} to={`/book/${heroData.heroSaga.id}/${heroData.heroBook.id}`}>
                        <img loading="lazy" src={heroData.heroBook.front} alt={heroData.heroBook.title} />
                    </Link>
                </div>

                <Link key={heroData.heroBook.title} to={`/book/${heroData.heroSaga.id}/${heroData.heroBook.id}`}
                    className='line-clamp-2 title font-bold text-4xl md:text-5xl'>
                    <h2>{heroData.heroBook.title}</h2>
                </Link>

                <span className='text-(--subtitle-color) text-xl  md:text-2xl'>{heroData.heroBook.category}</span>
                <div className='synopsis'>
                    <p>
                        <span className="text-lg md:text-xl" dangerouslySetInnerHTML={{ __html: synopsis }}></span>
                    </p>
                </div>

                <div className="buttonsContainer">
                    <Link key={heroData.heroBook.amazon} to={heroData.heroBook.amazon} target="_blank">
                        <button className='button text-neutral-50 text-xl'>
                            <img loading="lazy" src="/amazon_ico.png" alt="Amazon" className='buttonImage' />
                            Amazon
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </>
}