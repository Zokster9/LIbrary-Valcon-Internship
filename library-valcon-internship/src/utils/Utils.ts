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

export const convertAuthorsToAuthorDetails = (authors: Author[]) => {
  return authors.map((author) => {
    return {
      Id: author.Id,
      Firstname: author.FirstName,
      Lastname: author.LastName
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
