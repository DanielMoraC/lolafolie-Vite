import { useEffect, useState } from "react";
import './About.scss'
import type { Redes } from "../../models/types";
import { Link } from "react-router";

export default function Abount() {

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
            <section id="about" className="about flex-col">
                {aboutImg && <img className="hidden md:flex" src={aboutImg} alt="Lola Folie foto" />}
                <div className="info">
                    <div className="mb-7"><span className="text-5xl">Lola Folie</span></div>
                    <div className="aboutText text-xl mb-15" dangerouslySetInnerHTML={{ __html: aboutText! }}></div>
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
                </div>
            </section>
        </>
    )
}