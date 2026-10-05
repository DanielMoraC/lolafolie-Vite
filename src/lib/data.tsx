import { useEffect, useState } from "react";
import type { Saga } from "../models/types";

const path = '/config.json'

export async function getSagas() {
    const [sagas, setSagas] = useState<Saga[]>([])

    useEffect(() => {
        fetch(path)
            .then(async res => res.json())
            .then(res => setSagas(res.sagas))
    }, [])

    return sagas;
}