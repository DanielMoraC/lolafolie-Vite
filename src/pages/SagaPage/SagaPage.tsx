import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Footer } from "../../components/Footer/Footer"
import { Header } from "../../components/Header/Header"
import type { Book, Saga } from "../../models/types"
import './SagaPage.scss'
import { BookCardSaga } from "../../components/BookCardSaga/BookCardSaga"

export default function SagaPage() {
    const { sagaID } = useParams()
    const navigate = useNavigate()

    // const sagas = getSagas();
    const [saga, setSaga] = useState<Saga | undefined>()

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
            document.title = saga?.title ? saga.title + ' - Lola Folie' : 'Lola Folie'
        } else {
            throw404()
        }
    }

    return (
        <>
            <Header saga={saga} />
            <div className="pageContainer">
                <main className='sagaPage page'>
                    <section className='sagaHero'>
                        <img src={saga?.img} alt={saga?.title} />
                        <div className="imgGradient"></div>
                        <h1 className='text-7xl font-bold mb-9'>{saga?.title}</h1>
                        <div className="info text-xl italic">
                            <span>{saga?.category} · {saga?.books.length} novelas</span>
                        </div>
                    </section>

                    <div className="sagaDescription text-xl">
                        <p>{saga?.description}</p>
                    </div>

                    <section className="booksSection">
                        {saga?.books.map((book: Book, i: number) => {
                            return <BookCardSaga book={book} sagaId={saga.id} key={book.id} index={i} />
                        })}
                    </section>
                </main>
                <Footer />
            </div>
        </>
    )
}