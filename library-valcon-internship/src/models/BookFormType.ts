import AuthorDetail from './AuthorDetail'

export default interface BookFormType {
  requestCover: Blob
  cover: string
  authors: AuthorDetail[]
  title: string
  description: string
  isbn: string
  quantity: string
  releaseDate: Date | null
  selectedAuthors: AuthorDetail[]
}
