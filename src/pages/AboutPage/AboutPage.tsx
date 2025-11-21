import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/footer"
import { Header } from "../../components/header/header"
import './AboutPage.scss'
import { Link } from "react-router";
import type { Redes } from "../../types";
export default function AbountPage() {

    const [aboutText, setAboutText] = useState<string>('')
    const [aboutImg, setAboutImg] = useState<string>('')
    const [rrss, setRrss] = useState<Redes>()

    useEffect(() => {
        fetch('/config.json')
            .then(async res => res.json())
            .then(res => {
                setAboutText(`<p>${res.aboutMe.text.replaceAll('|', '</p><p>')}</p>`)
                setAboutImg(res.aboutMe.image)
                setRrss(res.redes)
            })
        document.title = 'Lola Folie'

    }, [])

    return (
        <>
            <Header />
            <div className='aboutPage page'>
                <div className="header">
                    <div className="horizontalLine"></div>
                    <img loading="lazy" src='/logo-vertical.png' alt="Lola Folie firma" />
                    <div className="horizontalLine"></div>
                </div>
                <div className="aboutMeContainer">
                    <aside className="hidden md:flex">
                        {/* {aboutImg && <img loading="lazy" src={aboutImg} alt="Lola Folie foto" />} */}
                        {aboutImg && <img src={aboutImg} alt="Lola Folie foto" />}
                    </aside>

                    <main className="infoBookContainer">
                        <h1 className="h1Generic">Sobre Lola Folie</h1>
                        <div className="aboutText text-lg md:text-xl" dangerouslySetInnerHTML={{ __html: aboutText! }}></div>
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
                    </main>
                </div>
            </div>
            <Footer />
        </>
    )
}