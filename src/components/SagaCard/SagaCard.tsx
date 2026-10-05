// 'use client'

import { Link } from 'react-router'
import type { Saga } from '../../models/types'
import './sagaCard.scss'

interface CardProps {
    saga: Saga
}

export function SagaCard({ saga }: CardProps) {

    return (
        <div className='cardSaga'>
            <Link key={saga?.title} to={`/${saga?.id}`}>
                <div className='containerImg'>
                    <img loading="lazy" src={saga.img} alt={saga.title} />
                    <span className='text-white italic'>{saga.books.length} novelas</span>
                    <div className='mask'></div>
                </div>
            </Link>

            <div className='info'>
                <Link key={saga?.title} to={`/${saga?.id}`}>
                    <span className='text-3xl'>{saga.title}</span>
                    <span className='text-gray-400 text-lg italic'> · {saga.category}</span>
                </Link>
                <span className='text-xl text-gray-500'>{saga.description}</span>
            </div>
        </div>
    )
}