import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/footer"
import { Header } from "../../components/header/header"
import './AboutPage.scss'
import { Link } from "react-router";
export default function AbountPage() {

    const [aboutText, setAboutText] = useState<string>('')
    const [aboutImg, setAboutImg] = useState<string>('')
    const [rrss, setRrss] = useState<{ instagram: string, amazon: string, goodreads: string, threads: string }>()

    useEffect(() => {
        fetch('/config.json')
            .then(async res => res.json())
            .then(res => {
                setAboutText(`<p>${res.aboutMe.text.replaceAll('|', '</p><p>')}</p>`)
                setAboutImg(res.aboutMe.image)
                setRrss(res.aboutMe.rrss)
            })
        document.title = 'Lola Folie'

    }, [])

    return (
        <>
            <Header />
            <div className='aboutPage'>
                <div className="header">
                    <div className="horizontalLine"></div>
                    <img src='/logo-vertical.png' alt="Lola Folie firma" />
                    <div className="horizontalLine"></div>
                </div>
                <div className="aboutMeContainer">
                    <aside>
                        {aboutImg && <img src={aboutImg} alt="Lola Folie foto" />}
                    </aside>

                    <main className="infoBookContainer">
                        <h1 className="h1Generic">Sobre Lola Folie</h1>
                        <div className="aboutText text-lg" dangerouslySetInnerHTML={{ __html: aboutText! }}></div>
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
                    </main>
                </div>
            </div>
            <Footer />
        </>
    )
}