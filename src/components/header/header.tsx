// 'use client'

import { Link, useLocation } from 'react-router'
import './header.scss'
import Hamburger from 'hamburger-react'
import { useState } from 'react'

export function Header() {
    const path = useLocation()

    const routes = [
        { name: 'Inicio', href: '/' },
        { name: 'Sobre mí', href: '/about' }
    ]

    const [toggledHamburger, setToggledHamburger] = useState(false)

    return (
        <>
            <header className='header'>
                <div className='icon'>
                    {/* <img loading="lazy" src="/ico.svg" alt="Firma Lola Folie" className='imgLogo' /> */}
                    <Link key={'Inicio'} to={'/'} className='text-4xl font-bold'>
                        <span >Lola Folie</span>
                    </Link>
                </div>
                <nav className='linkContainer md:flex hidden'>
                    {routes.map((route) => {
                        return (
                            <Link key={route.name} to={route.href}
                                className={`text-black text-xl ${path.pathname == route.href && 'aSelected'}`}>
                                <span className={`${path.pathname == route.href && 'aSelected'}`}>{route.name}</span>
                            </Link>
                        )
                    })}
                </nav>
                <div className='md:hidden flex hamburger'>
                    <Hamburger rounded onToggle={toggled => { setToggledHamburger(toggled) }} />
                </div>

            </header >
            {!toggledHamburger ? <></> :
                <>
                    <div className='navContainer md:hidden'>
                        <nav>
                            {routes.map((route) => {
                                return (
                                    <Link key={route.name} to={route.href}
                                        className={`text-black text-xl text-center ${path.pathname == route.href && 'aSelected'}`}>
                                        <span className={`${path.pathname == route.href && 'aSelected'}`}>{route.name}</span>
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                    <div className='mask md:hidden'></div>
                </>}
        </>
    )
}