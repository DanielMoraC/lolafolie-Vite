// 'use client'
import { Link } from 'react-router'
import './footer.scss'
import { useEffect, useState } from "react"
import type { Redes } from '../../types'

interface FooterProps {
    backgroundColor?: string | undefined
}

export function Footer({ backgroundColor }: FooterProps) {

    const [rrss, setRrss] = useState<Redes>()
    const [url] = useState<string>(window.location.pathname)

    useEffect(() => {
        const footer = document.querySelector('footer')
        footer?.style.setProperty('background', backgroundColor ? backgroundColor : 'var(--footer)')
        fetch('/config.json')
            .then(async res => res.json())
            .then(res => {
                setRrss(res.redes)
            })
    }, [backgroundColor])


    return (
        <footer>
            <div>
                {url != '/about' &&
                    <>
                        <div className="rrss">
                            {rrss?.tiktok && <Link key="tiktok" to={rrss.tiktok} target="_blank">
                                <button className='button'>
                                    <img loading="lazy" src="/tiktok_ico.png" alt="TikTok" className='buttonImage' />
                                </button>
                            </Link>}
                            {rrss?.instagram && <Link key="instagram" to={rrss.instagram} target="_blank">
                                <button className='button'>
                                    <img loading="lazy" src="/instagram_ico.png" alt="Instagram" className='buttonImage' />
                                </button>
                            </Link>}
                            {rrss?.amazon && <Link key="amazon" to={rrss.amazon} target="_blank">
                                <button className='button'>
                                    <img loading="lazy" src="/amazon_ico.png" alt="Amazon" className='buttonImage' />
                                </button>
                            </Link>}
                            {rrss?.goodreads && <Link key="goodreads" to={rrss.goodreads} target="_blank">
                                <button className='button'>
                                    <img loading="lazy" src="/goodreads_ico.png" alt="Goodreads" className='buttonImage' />
                                </button>
                            </Link>}
                            {rrss?.threads && <Link key="threads" to={rrss.threads} target="_blank">
                                <button className='button'>
                                    <img loading="lazy" src="/threads_ico.png" alt="Threads" className='buttonImage' />
                                </button>
                            </Link>}
                        </div>
                    </>
                }
            </div>
            <div>
                <div className='creator'>
                    <span className='text-sm'>Web creada por dmora.programador@gmail.com</span>
                </div>
            </div>
        </footer>
    )
}