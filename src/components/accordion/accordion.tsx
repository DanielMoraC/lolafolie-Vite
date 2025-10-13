// 'use client'

import { Link } from 'react-router'
import type { Book, Saga } from '../../types'
import { useEffect, useState } from 'react'
import { BookOpenText, BookText } from 'lucide-react'
import './accordion.scss'
import { Card } from '../card/card'

interface AccordionProps {
    saga: Saga,
    only: boolean
}

interface AccordionBodyProps {
    saga: string,
    books: Book[]
}

export function AccordionBody({ saga, books }: AccordionBodyProps) {

    return (
        <>
            {books?.map((book: Book) => {
                return (
                    <Card key={book?.id} saga={saga} card={book} sagaPage={false}></Card>
                )
            })}
        </>
    )
}

export function Accordion({ saga, only }: AccordionProps) {

    const [open, setOpen] = useState<boolean>(true)
    const [maxHeight, setHeight] = useState<string>("100000000px")

    useEffect(() => {
        setTimeout(() => {
            checkHeight()

            window.addEventListener('resize', () => {
                setHeight('unset');
                checkHeight()
            })
        }, 100);
    }, [])

    const checkHeight = () => {
        setHeight(`${document.querySelector('.accordionBody') ? document.querySelector('.accordionBody')?.clientHeight : 0}px`);
    }

    const onAccordionClick = () => {
        if (!only) {
            setOpen(!open);
        }
    }

    return (
        <div className='accordionContainer'>
            <div className='accordionHeader' style={{ cursor: only ? 'default' : 'pointer' }}>
                <div>
                    <Link key={saga?.title} to={`/saga/${saga?.id}`}
                        className='line-clamp-1 title'>
                        <span className='text-3xl font-bold'>{saga?.title}</span>
                    </Link>
                </div>
                <div className='accordionArrow' onClick={onAccordionClick}>
                    <span className='accordionDesc text-xl text-gray-500'>{saga?.category}</span>
                    {
                        open ?
                            <BookOpenText color='black' />
                            : <BookText color='black' />
                    }
                </div>
            </div>
            <div className={`accordionBody ${open ? 'accordionBodyOpen' : 'accordionBodyClosed'} accordionBody`} style={{ maxHeight: maxHeight }}>
                <AccordionBody saga={saga?.id} books={saga?.books}></AccordionBody>
            </div>

        </div>
    )
}