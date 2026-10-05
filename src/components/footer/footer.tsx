import './footer.scss'
import { useEffect } from "react"

interface FooterProps {
    backgroundColor?: string | undefined
}

export function Footer({ backgroundColor }: FooterProps) {

    useEffect(() => {
        const footer = document.querySelector('footer')
        footer?.style.setProperty('background', backgroundColor ? backgroundColor : 'var(--footer)')
        footer?.style.setProperty('border-top', backgroundColor ? 'none' : '1px solid #a9a9a9')
        footer?.style.setProperty('color', backgroundColor ? 'var(--color-gray-400)' : 'unset')
    }, [backgroundColor])


    return (
        <footer>
            <span className='text-sm'>Web creada por dmora-programador.com</span>
            <span>&#64; 2026 Lola Follie</span>
        </footer>
    )
}