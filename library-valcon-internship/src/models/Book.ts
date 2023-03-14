import Author from './Author'

export default interface Book {
  Id: number
  Title: string
  Description: string
  Isbn: string
  Quantity: number
  Available: number
  Cover: string
  PublishDate: string
  Authors: Author[]
}
