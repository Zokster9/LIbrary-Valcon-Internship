import User from './User'

export default interface BookRentHistory {
  Id: number
  User: User
  RentDate: Date
  IsReturned: boolean
}
