import BookPagedResponse from './BookPagedResponse'

export default interface BooksPagedResponse {
  Items: BookPagedResponse[]
  TotalCount: number
}
