import { useEffect, useState } from "react";
import { Accordion } from "../../components/accordion/accordion";
import { Footer } from "../../components/footer/footer"
import { Header } from "../../components/header/header"
import type { Saga, Book, HeroData, HeroDataComponent } from "../../types";
import './HomePage.scss'
import { Hero } from "../../components/hero/hero";

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
                <div className='homePage page'>
                    <main>
                        <h1 className="h1Generic">Lola Folie - Autora de novela romántica</h1>
                        {sagas?.map((saga: Saga) => {
                            return (
                                <Accordion key={saga?.id} saga={saga} only={sagas.length == 1}></Accordion>
                            )
                        })}
                    </main>
                </div>
                <Footer />
            </div>
        </>
    )
}