import AuthorDetail from './AuthorDetail'

export default interface BookDetail {
  Id: number
  Title: string
  Description: string
  ISBN: string
  Quantity: number
  Available: number
  Cover: string
  PublishDate: string
  Authors: AuthorDetail[]
}
