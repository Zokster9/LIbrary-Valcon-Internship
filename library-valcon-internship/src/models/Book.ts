import Author from './Author'

export default interface Book {
  id: number
  title: string
  description: string
  isbn: string
  quantity: number
  available: number
  cover: string
  publishDate: Date
  authors: Author[]
}
