import Author from '../models/Author'
import AuthorFormType from '../models/AuthorFormType'
import AuthorFormValidation from '../models/AuthorFormValidation'
import Book from '../models/Book'
import BookFormType from '../models/BookFormType'
import BookFormValidation from '../models/BookFormValidation'
import BookRentHistory from '../models/BookRentHistory'
import AuthorIdResponse from '../models/responses/AuthorIdResponse'
import AuthorPagedResponse from '../models/responses/AuthorPagedResponse'
import BookIdResponse from '../models/responses/BookIdResponse'
import BookPagedResponse from '../models/responses/BookPagedResponse'
import BookRentHistoryResponse from '../models/responses/BookRentHistoryResponse'
import TopBookRentalsResponse from '../models/responses/TopBookRentalsResponse'

export const BASE_64_EXTENSION = 'data:image/png;base64,'

export const convertDateToString = (date: Date) => {
  return new Intl.DateTimeFormat('sr-RS').format(date)
}

export const convertAuthorsToArrayString = (authors: Author[]) => {
  if (authors.length > 0) {
    return authors.map((author) => `${author.FirstName} ${author.LastName}`).join(', ')
  } else {
    return 'Unknown'
  }
}

export const convertBooksPagedResponseToBooks = (books: BookPagedResponse[]): Book[] => {
  return books.map(book => {
    return {
      Id: book.Id,
      Title: book.Title,
      Description: book.Description,
      Isbn: book.Isbn,
      Cover: book.Cover,
      Authors: convertAuthorPagedResponseToAuthors(book.Authors),
      PublishDate: new Date(book.PublishDate),
      Quantity: book.Quantity,
      Available: book.Available
    }
  })
}

const convertAuthorPagedResponseToAuthors = (authors: AuthorPagedResponse[]): Author[] => {
  return authors.map(author => {
    return {
      Id: author.Id,
      FirstName: author.FirstName,
      LastName: author.LastName
    }
  })
}

export const convertBookIdResponseToBook = (book: BookIdResponse): Book => {
  return {
    Id: book.Id,
    Title: book.Title,
    Description: book.Description,
    Isbn: book.ISBN,
    Cover: book.Cover,
    Authors: convertAuthorIdResponseToAuthors(book.Authors),
    PublishDate: new Date(book.PublishDate),
    Quantity: book.Quantity,
    Available: book.Available
  }
}

const convertAuthorIdResponseToAuthors = (authors: AuthorIdResponse[]): Author[] => {
  return authors.map(author => {
    return {
      Id: author.Id,
      FirstName: author.Firstname,
      LastName: author.Lastname
    }
  })
}

export const convertBookHistoryResponseToBookHistory = (bookHistories: BookRentHistoryResponse[]): BookRentHistory[] => {
  return bookHistories.map(bookHistory => {
    return {
      Id: bookHistory.Id,
      User: bookHistory.User,
      RentDate: new Date(bookHistory.RentDate),
      IsReturned: bookHistory.IsReturned
    }
  })
}

export const convertBase64ToBlob = (base64Image: string): Blob => {
  const parts = base64Image.split(';base64,')
  const imageType = parts[0].split(':')[1]
  const decodedData = window.atob(parts[1])
  const uInt8Array = new Uint8Array(decodedData.length)
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i)
  }
  return new Blob([ uInt8Array ], { type: imageType })
}

export const setDefaultCoverValue = (requestCover: Blob | string): string => {
  return requestCover instanceof Blob ? '' : `${BASE_64_EXTENSION}${requestCover}`
}

export const initBookForm = (book: Book | undefined): BookFormType => {
  if (book) {
    const requestCover = book.Cover ? book.Cover : new Blob()
    return {
      requestCover,
      title: book.Title,
      description: book.Description,
      isbn: book.Isbn,
      quantity: book.Quantity.toString(),
      releaseDate: book.PublishDate,
      selectedAuthors: book.Authors,
      authors: []
    }
  } else {
    return {
      requestCover: new Blob(),
      title: '',
      description: '',
      isbn: '',
      quantity: '',
      releaseDate: null,
      selectedAuthors: [],
      authors: []
    }
  }
}

export const initBookFormValidation = (): BookFormValidation => {
  return {
    isTitleValid: true,
    isDescriptionValid: true,
    isIsbnValid: true,
    isQuantityValid: true,
    isReleaseDateValid: true,
    isSelectedAuthorsValid: true,
    isDataValid: true
  }
}

export const initAuthorForm = (): AuthorFormType => {
  return {
    firstName: '',
    lastName: ''
  }
}

export const initAuthorFormValidation = (): AuthorFormValidation => {
  return {
    isFirstNameValid: true,
    isLastNameValid: true,
    isAuthorDataValid: true
  }
}

export const convertTopRentalBooksToBooks = (topRentalBooks: TopBookRentalsResponse[]): Book[] => {
  return topRentalBooks.map(topRentalBook => {
    return {
      Id: topRentalBook.Id,
      Title: topRentalBook.Title,
      Description: topRentalBook.Description,
      Cover: topRentalBook.Cover,
      Isbn: topRentalBook.ISBN,
      PublishDate: new Date(topRentalBook.PublishDate),
      Quantity: 0,
      Available: 0,
      Authors: [],
      RentCount: topRentalBook.RentCount
    }
  })
}
