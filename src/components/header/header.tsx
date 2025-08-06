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
                            className={`a ${path.pathname == route.href && 'aSelected'}`}>
                            <p>{route.name}</p>
                        </Link>
                    )
                })}
            </div>
        </header >
    )
}