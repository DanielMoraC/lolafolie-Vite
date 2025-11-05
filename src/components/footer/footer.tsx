// 'use client'
import { Link } from 'react-router'
import './footer.scss'
import { useEffect, useState } from "react"

interface FooterProps {
    backgroundColor?: string | undefined
}

export function Footer({ backgroundColor }: FooterProps) {

    const [rrss, setRrss] = useState<{ instagram: string, amazon: string, goodreads: string, threads: string }>()
    const [url] = useState<string>(window.location.pathname)

    useEffect(() => {
        const footer = document.querySelector('footer')
        footer?.style.setProperty('background', backgroundColor ? backgroundColor : 'var(--background)')
        fetch('/config.json')
            .then(async res => res.json())
            .then(res => {
                setRrss(res.rrss)
            })
    }, [backgroundColor])


    return (
        <footer>
            {url != '/about' &&
                <div className="rrss">
                    {rrss?.instagram && <Link key="instagram" to={rrss.instagram} target="_blank">
                        <button className='button'>
                            <img src="/instagram_ico.png" alt="Instagram" className='buttonImage' />
                        </button>
                    </Link>}
                    {rrss?.amazon && <Link key="amazon" to={rrss.amazon} target="_blank">
                        <button className='button'>
                            <img src="/amazon_ico.png" alt="Amazon" className='buttonImage' />
                        </button>
                    </Link>}
                    {rrss?.goodreads && <Link key="goodreads" to={rrss.goodreads} target="_blank">
                        <button className='button'>
                            <img src="/goodreads_ico.png" alt="Goodreads" className='buttonImage' />
                        </button>
                    </Link>}
                    {rrss?.threads && <Link key="threads" to={rrss.threads} target="_blank">
                        <button className='button'>
                            <img src="/threads_ico.png" alt="Threads" className='buttonImage' />
                        </button>
                    </Link>}
                </div>
            }
            <div className='creator'>
                <span className='text-sm'>Web creada por dmora.programador@gmail.com</span>
            </div>
        </footer>
    )
}