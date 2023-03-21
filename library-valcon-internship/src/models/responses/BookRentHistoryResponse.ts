import User from '../User'

export default interface BookRentHistoryResponse {
  Id: number
  User: User
  RentDate: string
  IsReturned: boolean
}
