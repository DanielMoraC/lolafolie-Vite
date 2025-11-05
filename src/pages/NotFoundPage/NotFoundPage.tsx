import { Link } from "react-router";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import './NotFoundPage.scss'
import { BookDashed } from "lucide-react";

export default function NotFoundPage() {

    return (
        <>
            <Header />
            <main className="notFoundPage page">
                <BookDashed color="black" />
                <h1 className="text-3xl">404 No se ha encontrado la página</h1>
                <div className="links">
                    <Link to="/" className="text-3xl font-bold hover:underline">Inicio</Link>
                    <Link to="/about" className="text-3xl font-bold hover:underline">Sobre mi</Link>
                </div>
            </main>
            <Footer />
        </>
    )
}