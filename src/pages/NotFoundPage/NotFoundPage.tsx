import { Link } from "react-router";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import './NotFoundPage.scss'

export default function NotFoundPage() {

    return (
        <>
            <Header />
            <main className="notFoundPage">
                <h1>404 No se ha encontrado la página</h1>
                <Link to="/">Inicio</Link>
                <Link to="/">Sobre mi</Link>
            </main>
            <Footer />
        </>
    )
}