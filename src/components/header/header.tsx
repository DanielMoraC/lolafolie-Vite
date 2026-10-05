import { Link, useLocation } from 'react-router'
import './header.scss'
import type { Book, Saga } from '../../models/types';

interface HeaderProps {
    saga?: undefined | Saga,
    book?: undefined | Book
}

export function Header({ saga, book }: HeaderProps) {
    const path = useLocation()

    const handleScroll = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth', // Animate scroll
            block: 'start', // Align top of target with viewport top
            inline: 'nearest' // Align left/right as needed
        });
    };

    return (
        <>
            <header className='header'>
                <div className='icon'>
                    <Link key={'Inicio'} to={'/'} className='text-4xl font-bold'>
                        <span className='cormorant-garamond-titles font-bold text-(--link-active)'><span className='italic text-(--link-hover)'>Lola</span> Folie</span>
                    </Link>
                </div>
                <nav className='linkContainer md:flex hidden'>
                    {
                        path.pathname == '/' ?
                            <>
                                <button className='link' onClick={() => { handleScroll('hero') }}>Inicio</button>
                                <button className='link' onClick={() => { handleScroll('sagas') }}>Sagas</button>
                                <button className='link' onClick={() => { handleScroll('books') }}>Libros</button>
                                <button className='link' onClick={() => { handleScroll('about') }}>Sobre mi</button>
                            </>
                            :
                            path.pathname == '/notFound' ?
                                <>
                                    <Link key={'Inicio'} to={'/'}>
                                        <span>Inicio</span>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link key={'Inicio'} to={'/'} className='gray'>
                                        <span>Inicio</span>
                                    </Link>
                                    {saga && <>
                                        <span className='text-gray-500'>&#47;</span>
                                        <Link key={saga.title} to={`/${saga.id}`} className={book && 'gray'}>
                                            <span>{saga.title}</span>
                                        </Link>
                                    </>}
                                    {book && saga && <>
                                        <span className='text-gray-500'>&#47;</span>
                                        <Link key={book.title} to={`/${saga.id}/${book?.id}`}>
                                            <span>{book.title}</span>
                                        </Link>
                                    </>}
                                </>
                    }
                </nav>
            </header >
        </>
    )
}