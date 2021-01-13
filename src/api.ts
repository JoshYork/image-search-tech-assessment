import React from 'react'
import { prop } from 'ramda'
import qs from 'query-string'
import { Keywords, Category, ImageResults } from './types'

export const fetchJSON = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  return fetch(input, init).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response.json()
  })
}

export type PixabyResponse = {
  hits: ImageResults
}

export const fetchPixabyImages = async (
  keywords: Keywords,
  category?: Category,
): Promise<ImageResults> => {
  const queryString = qs.stringify({
    key: process.env.REACT_APP_PIXABY_API_KEY,
    q: keywords.join('+'),
    category,
    per_page: 10,
  })

  return fetchJSON<PixabyResponse>(
    `https://pixabay.com/api?${queryString}`,
  ).then(prop('hits'))
}

export type FetchError = Error | null

export const usePixabyApi = () => {
  const [isFetching, setFetching] = React.useState(false)
  const [error, setError] = React.useState<FetchError>(null)
  const [imageResults, setImageResults] = React.useState<ImageResults>([])

  const fetchImages = async (keywords: Keywords, category?: Category) => {
    setFetching(true)
    await fetchPixabyImages(keywords, category)
      .then((imageResults: ImageResults) => {
        setImageResults(imageResults)
        setFetching(false)
        setError(null)
      })
      .catch((error: Error) => {
        setError(error)
        setFetching(false)
      })
  }

  return {
    imageResults,
    setImageResults,
    fetchImages,
    isFetching,
    error,
    setError,
  }
}
