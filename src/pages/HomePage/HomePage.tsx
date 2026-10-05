import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer/Footer"
import { Header } from "../../components/Header/Header"
import type { Saga, Book, HeroData, HeroDataComponent } from "../../models/types";
import './HomePage.scss'
import { Hero } from "../../components/Hero/Hero";
import { Books } from "../../components/Books/Books";
import { Sagas } from "../../components/Sagas/Sagas";
import About from "../../components/About/About";

export default function HomePage() {

    const [sagas, setSagas] = useState<Saga[]>([])
    const [heroData, setHeroData] = useState<HeroDataComponent>()

    useEffect(() => {
        fetch('/config.json')
            .then(async res => res.json())
            .then(res => {
                setSagas(res.sagas)
                setHero(res.sagas, res.heroData)
            })
        document.title = 'Lola Folie'
    }, [])

    const setHero = async (sagas: Saga[], hero: HeroData) => {
        sagas.forEach(saga => {
            const book = saga.books.find((book: Book) => book.id == hero.id)
            if (book) {
                const data: HeroDataComponent = {
                    heroBook: book,
                    heroSaga: saga,
                    colorUp: hero.backgroundUp,
                    colorDown: hero.backgroundDown
                }
                setHeroData(data)
            }

        });
    }

    return (
        <>
            <Header />
            <div className="pageContainer">
                {heroData && <Hero heroData={heroData}></Hero>}
                <main>
                    <h1 className="h1Generic">Lola Folie - Autora de novela romántica</h1>
                    <Sagas sagasData={sagas} />
                    <Books sagasData={sagas} />
                    <About />
                </main>
                <Footer backgroundColor={'oklch(14.7% 0.004 49.25)'} />
            </div>
        </>
    )
}