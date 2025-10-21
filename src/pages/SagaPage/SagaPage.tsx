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
        fetch('/config.json')
            .then(async res => res.json())
            .then(res => {
                setSagaFunction(res.sagas)
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
                        <h1 className='text-3xl font-bold'>{saga?.title}</h1>
                    </div>

                    <div className='sagaContainer'>
                        <p className='text-xl'>{saga?.description}</p>
                        {saga?.books?.map((book: Book) => {
                            return (
                                <Card key={book?.id} saga={saga?.id} card={book} sagaPage={true}></Card>
                            )
                        })}
                    </div>
                </div>

                {otherSagas && otherSagas?.length > 0 &&
                    <div className="otherSaga">
                        <div className='sagaHeader'>
                            <h3 className='text-2xl'>Otras sagas</h3>
                        </div>

                        <div className='otherSagasContainer'>
                            {otherSagas?.map((saga) => {
                                return (
                                    <Link key={saga?.title} to={`/saga/${saga?.id}`}>
                                        <div className='linkContainer'>
                                            <span className='text-xl'>{saga?.title}</span>
                                            <span className='text-lg text-gray-500'>{saga?.category}</span>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                }
            </main>
            <Footer />
        </>
    )
}