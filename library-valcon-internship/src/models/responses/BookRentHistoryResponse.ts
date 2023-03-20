import User from '../User'

export default interface BookRentHistoryResponse {
  User: User
  RentDate: string
  IsReturned: boolean
}
