import Author from '../models/Author'
import AuthorDetail from '../models/AuthorDetail'

export const convertDateToString = (date: string) => {
  return new Intl.DateTimeFormat('sr-RS').format(new Date(date))
}

export const convertAuthorsToArrayString = (authors: Author[]) => {
  if (authors.length > 0) {
    return authors.map((author) => `${author.FirstName} ${author.LastName}`).join(', ')
  } else {
    return 'Unknown'
  }
}

export const convertAuthorDetailsToArrayString = (authors: AuthorDetail[]) => {
  if (authors.length > 0) {
    return authors.map((author) => `${author.Firstname} ${author.Lastname}`).join(', ')
  } else {
    return 'Unknown'
  }
}
