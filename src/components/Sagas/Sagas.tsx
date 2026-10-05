import type { Saga } from '../../models/types'
import './Sagas.scss'
import { SagaCard } from '../SagaCard/SagaCard'

interface SagasProps {
    sagasData: Saga[]
}

export function Sagas({ sagasData }: SagasProps) {

    return <>
        <section id='sagas' className='sagas flex-col'>
            <span className='cormorant-garamond-titles italic text-2xl text-center'>Universo novelistico</span>
            <h2 className='text-5xl text-center'>Sagas</h2>

            <div className='sagasContainer flex-col md:flex-row'>
                {sagasData.map((saga: Saga) => {
                    return <SagaCard key={saga.id} saga={saga} />
                })}
            </div>
        </section>
    </>
}