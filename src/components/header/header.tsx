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
            <img src="/logo.png" alt="Firma Lola Folie" className='imgLogo' />
            {/* <Image
                src={'/logo.png'}
                alt="Firma Lola Folie"
                width={128}
                height={41}
                className={styles.img}
            /> */}
            <div className='linkContainer'>
                {routes.map((route) => {
                    return (
                        <Link key={route.name} to={route.href}
                            className={`text-black text-2xl ${path.pathname == route.href && 'aSelected'}`}>
                            <span className={`hover:text-rose-900 active:text-rose-800 ${path.pathname == route.href && 'aSelected text-rose-950'}`}>{route.name}</span>
                        </Link>
                    )
                })}
            </div>
        </header >
    )
}