import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { Footer } from "../../components/footer/footer"
import { Header } from "../../components/header/header"
import type { Book, Saga } from "../../types"
import './SagaPage.scss'
import { Card } from "../../components/card/card"

export default function SagaPage() {

    const params = useParams<{ sagaID: string }>()

    // const sagas = getSagas();
    const [saga, setSaga] = useState<Saga | undefined>()
    const [otherSagas, setOtherSagas] = useState<Saga[] | undefined>()

    useEffect(() => {
        fetch('/public/config.json')
            .then(async res => res.json())
            .then(res => {
                setSagaFunction(res.sagas)
                // setSaga(res.sagas.find((saga: Saga) => saga.id == params.sagaID))
                // setOtherSagas(res.sagas.filter((saga: Saga) => saga.id != params.sagaID))
                // document.title = saga?.title ? saga.title + ' - Lola Folie' : 'Lola Folie'
            })
    }, [params])

    const setSagaFunction = (sagas: Saga[]) => {
        setSaga(sagas.find((saga: Saga) => saga.id == params.sagaID))
        setOtherSagas(sagas.filter((saga: Saga) => saga.id != params.sagaID))
        document.title = saga?.title ? saga.title + ' - Lola Folie' : 'Lola Folie'
    }

    return (
        <>
            <Header />
            <main className='sagaPage'>
                <div>
                    <div className='sagaHeader'>
                        <span className='sagaTitle'>{saga?.title}</span>
                    </div>

                    <div className='sagaContainer'>
                        <p className='sagaDescription'>{saga?.description}</p>
                        {saga?.books?.map((book: Book) => {
                            return (
                                <Card key={book?.id} saga={saga?.id} card={book} sagaPage={true}></Card>
                            )
                        })}
                    </div>
                </div>

                <div>
                    <div className='sagaHeader'>
                        <span className='otherSaga'>Otras sagas</span>
                    </div>

                    <div className='otherSagasContainer'>
                        {otherSagas?.map((saga) => {
                            return (
                                <Link key={saga?.title} to={`/saga/${saga?.id}`}>
                                    <div className='linkContainer'>
                                        <span className='otherSagaTitle'>{saga?.title}</span>
                                        <span className='otherSagaCategory'>{saga?.category}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}