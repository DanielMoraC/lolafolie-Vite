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
        fetch('/public/config.json')
            .then(async res => res.json())
            .then(res => setSagas(res.sagas))
        document.title = 'Lola Folie'
    }, [])

    return (
        <>
            <Header />
            <div className='homePage'>
                <main>
                    {sagas?.map((saga: Saga) => {
                        return (
                            <Accordion key={saga?.id} saga={saga}></Accordion>
                        )
                    })}
                </main>
            </div>
            <Footer />
        </>
    )
}