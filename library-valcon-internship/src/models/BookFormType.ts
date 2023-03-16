import AuthorDetail from './AuthorDetail'

export default interface BookFormType {
  requestCover: Blob | string
  cover: string
  authors: AuthorDetail[]
  title: string
  description: string
  isbn: string
  quantity: string
  releaseDate: Date | null
  selectedAuthors: AuthorDetail[]
}
