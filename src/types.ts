export const categories = [
  'fashion',
  'nature',
  'backgrounds',
  'science',
  'education',
  'people',
  'feelings',
  'religion',
  'health',
  'places',
  'animals',
  'industry',
  'food',
  'computer',
  'sports',
  'transportation',
  'travel',
  'buildings',
  'business',
  'music',
] as const

export type Category = typeof categories[number]

export type Keywords = Array<string>

export type ImageResult = {
  id: number
  webformatURL: string
  largeImageURL: string
  likes: number
  favorites: number
  tags: string
}

export type ImageResults = Array<ImageResult>
