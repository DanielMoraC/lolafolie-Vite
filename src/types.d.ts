export interface Data {
    redes: Redes
    aboutMe: AboutMe
    sagas: Saga[]
}

export interface AboutMe {
    text, image: string
}

export interface Redes {
    instagram, amazon, goodreads, threads: string
}

export interface Saga {
    id: string,
    title: string,
    description: string,
    category: string,
    books: Book[]
}

export interface Book {
    id: string,
    title: string,
    synopsis: string,
    age: string | undefined,
    amazon: string,
    goodreads: string | undefined,
    category: string[],
    spice: number | undefined,
    img: string,
    front: string
    isbn: string | undefined,
    publishDate: string | undefined,
    colorUp: string | undefined,
    colorDown: string | undefined,
}