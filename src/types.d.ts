export interface Data {
    redes: Redes
    aboutMe: AboutMe
    heroData: HeroData
    sagas: Saga[]
}

export interface AboutMe {
    text, image: string
}

export interface Redes {
    instagram, amazon, goodreads, threads, tiktok: string
}

export interface Saga {
    id: string,
    title: string,
    description: string,
    category: string,
    books: Book[]
}

export interface HeroData {
    id: string,
    backgroundUp: string | undefined,
    backgroundDown: string | undefined
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

export interface HeroDataComponent {
    heroBook: Book,
    heroSaga: Saga,
    colorUp: string | undefined,
    colorDown: string | undefined
}