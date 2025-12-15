import { useEffect, useState } from "react";
import { Accordion } from "../../components/accordion/accordion";
import { Footer } from "../../components/footer/footer"
import { Header } from "../../components/header/header"
// import { getSagas } from "../lib/data";
import type { Saga } from "../../types";
import './HomePage.scss'

export default function HomePage() {

    // const sagas = getSagas();
    const [sagas, setSagas] = useState<Saga[]>([])

    useEffect(() => {
        fetch('/config.json')
            .then(async res => res.json())
            .then(res => setSagas(res.sagas))
        document.title = 'Lola Folie'
    }, [])

    return (
        <>
            <Header />
            <div className="pageContainer">
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