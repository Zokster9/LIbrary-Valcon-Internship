import User from './User'

export default interface BookRentHistory {
  Id: string
  User: User
  RentDate: Date
  IsReturned: boolean
}
