import Author from './Author'

export default interface BookFormType {
  requestCover: Blob
  cover: string
  authors: Author[]
  title: string
  description: string
  isbn: string
  quantity: string
  releaseDate: Date | null
  selectedAuthors: Author[]
}
