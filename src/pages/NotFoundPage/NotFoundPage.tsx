import { Link } from "react-router";

export default function NotFoundPage() {

    return (
        <>
            <h1>404 No se ha encontrado la página</h1>
            <Link to="/">Inicio</Link>
        </>
    )
}