import { useEffect, useState } from "react";
import type { Saga } from "../types";

const path = '/public/config.json'

export async function getSagas() {
    const [sagas, setSagas] = useState<Saga[]>([])

    useEffect(() => {
        fetch(path)
            .then(async res => res.json())
            .then(res => setSagas(res.sagas))
    }, [])

    return sagas;
}