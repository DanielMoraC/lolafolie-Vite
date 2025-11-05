// 'use client'

import { Link, useLocation } from 'react-router'
import './header.scss'

export function Header() {
    const path = useLocation()

    const routes = [
        { name: 'Inicio', href: '/' },
        { name: 'Sobre mi', href: '/about' }
    ]

    return (
        <header className='header'>
            <div className='icon'>
                {/* <img src="/ico.svg" alt="Firma Lola Folie" className='imgLogo' /> */}
                <span className='text-3xl font-bold'>Lola Folie</span>
            </div>
            <nav className='linkContainer'>
                {routes.map((route) => {
                    return (
                        <Link key={route.name} to={route.href}
                            className={`text-black text-xl ${path.pathname == route.href && 'aSelected'}`}>
                            <span className={`hover:text-rose-900 active:text-rose-800 ${path.pathname == route.href && 'aSelected text-rose-950'}`}>{route.name}</span>
                        </Link>
                    )
                })}
            </nav>
        </header >
    )
}