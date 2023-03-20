import AuthorIdResponse from './AuthorIdResponse'

export default interface BookIdResponse {
  Id: number
  Title: string
  Description: string
  ISBN: string
  Quantity: number
  Available: number
  Cover: string
  PublishDate: string
  Authors: AuthorIdResponse[]
}
