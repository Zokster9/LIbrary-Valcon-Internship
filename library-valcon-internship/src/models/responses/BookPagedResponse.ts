import AuthorPagedResponse from './AuthorPagedResponse'

export default interface BookPagedResponse {
  Id: number
  Title: string
  Description: string
  Isbn: string
  Cover: string
  PublishDate: string
  Authors: AuthorPagedResponse[]
}
