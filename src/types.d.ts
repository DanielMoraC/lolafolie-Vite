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
}