import { Link } from "react-router";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import './NotFoundPage.scss'
import { BookDashed } from "lucide-react";

export default function NotFoundPage() {

    return (
        <>
            <Header />
            <div className="pageContainer">
                <main className="notFoundPage page">
                    <BookDashed color="#d8315b" />
                    <h1 className="text-3xl font-bold">404 No se ha encontrado la página</h1>
                    <Link to="/">
                        <span className="text-3xl">Volver a inicio</span>
                    </Link>
                    {/* <div className="links">
                        <Link to="/">
                            <span className="text-3xl">Inicio</span>
                        </Link>
                        <Link to="/about">
                            <span className="text-3xl">Sobre mi</span>
                        </Link>
                    </div> */}
                </main>
                <Footer />
            </div>
        </>
    )
}