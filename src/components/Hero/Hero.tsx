import { Link } from "react-router";
import 'Hero.scss'
import type { HeroDataComponent } from "../../models/types";
import { useEffect, useState } from "react";
import { formatDateBook } from "../../hooks/useDate";

interface HeroProps {
    heroData: HeroDataComponent
}

export function Hero({ heroData }: HeroProps) {

    const [synopsis] = useState(`<p>${heroData.heroBook.synopsis.split('|', 6).join('</p><p>')}</p>`)

    const [dateFormated, setDateFormated] = useState<string>()

    useEffect(() => {
        setDateFormated(heroData?.heroBook?.publishDate && formatDateBook({ date: heroData?.heroBook?.publishDate }))
    }, [heroData])

    return <>
        <div className="hero py-6 px-6 md:py-20 md:px-20 flex-col md:flex-row gap-y-7" id="hero">
            <div className="info">
                <h3 className="text-md italic text-(--link-hover)">Nueva novela</h3>

                <h2 className="cormorant-garamond-titles font-bold">{heroData.heroBook.title}</h2>

                <h3 className="italic text-zinc-700 text-2xl mb-4">Saga &#171;{heroData.heroSaga.title}&#187;</h3>

                <div className='synopsis mb-5'>
                    <p>
                        <span className="" dangerouslySetInnerHTML={{ __html: synopsis }}></span>
                    </p>
                </div>

                <span><span className="text-(--subtitle-color)">{heroData.heroBook.category}</span> · Páginas: {heroData?.heroBook?.pages} · Fecha: {dateFormated}</span>

                <div className="buttonsContainer">
                    <Link key={heroData.heroBook.id} to={`/${heroData.heroSaga.id}/${heroData.heroBook.id}`}>
                        <button className='button text-xl primary'>
                            Descubre más &#8594;
                        </button>
                    </Link>
                    <Link key={heroData.heroSaga.id} to={`/${heroData.heroSaga.id}`}>
                        <button className='button text-xl tertiary'>
                            Ver saga
                        </button>
                    </Link>
                </div>
            </div>

            <div className="img max-w-full md:max-w-35/100">
                <img loading="lazy" src={heroData.heroBook.img} alt={heroData.heroBook.title} />
            </div>
        </div>
    </>
}