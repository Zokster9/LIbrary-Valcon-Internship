import Author from '../models/Author'
import Book from '../models/Book'
import BookFormType from '../models/BookFormType'
import AuthorIdResponse from '../models/responses/AuthorIdResponse'
import AuthorPagedResponse from '../models/responses/AuthorPagedResponse'
import BookIdResponse from '../models/responses/BookIdResponse'
import BookPagedResponse from '../models/responses/BookPagedResponse'

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
      Quantity: 0,
      Available: 0
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
