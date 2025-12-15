import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { Footer } from "../../components/footer/footer"
import { Header } from "../../components/header/header"
import type { Book, Saga } from "../../types"
import './SagaPage.scss'
import { Card } from "../../components/card/card"

export default function SagaPage() {
    const { sagaID } = useParams()
    const navigate = useNavigate()

    // const sagas = getSagas();
    const [saga, setSaga] = useState<Saga | undefined>()
    const [otherSagas, setOtherSagas] = useState<Saga[] | undefined>()

    useEffect(() => {
        getSagas()
    }, [sagaID])

    const throw404 = () => {
        navigate("/notFound");
    }

    const getSagas = async () => {
        await fetch('/config.json')
            .then(async res => {
                const data = await res.json()

                const temporalSagas = data?.sagas

                setSaga(temporalSagas)
                setSagaFunction(temporalSagas)
            })
    }

    const setSagaFunction = (sagas: Saga[]) => {
        const saga = sagas.find((saga: Saga) => saga.id == sagaID);
        if (saga) {
            setSaga(sagas.find((saga: Saga) => saga.id == sagaID))
            setOtherSagas(sagas.filter((saga: Saga) => saga.id != sagaID))
            document.title = saga?.title ? saga.title + ' - Lola Folie' : 'Lola Folie'
        } else {
            throw404()
        }
    }

    return (
        <>
            <Header />
            <div className="pageContainer">
                <main className='sagaPage page'>
                    <div>
                        <div className='sagaHeader'>
                            <h1 className='text-3xl font-bold'>{saga?.title}</h1>
                        </div>

                        <div className='sagaContainer'>
                            <p className='text-xl'>{saga?.description}</p>
                            <div className="books">
                                {saga?.books?.map((book: Book) => {
                                    return (
                                        <Card key={book?.id} saga={saga?.id} card={book} sagaPage={true}></Card>
                                    )
                                })}
                            </div>
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
                                                <span className='text-lg text-(--subtitle-color)'>{saga?.category}</span>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </main>
                <Footer />
            </div>
        </>
    )
}