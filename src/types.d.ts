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
    age: string,
    amazon: string,
    goodreads: string,
    category: string[],
    spice: number,
    img: string,
    isbn: string,
    publishDate: string,
}