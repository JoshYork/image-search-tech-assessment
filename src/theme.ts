import { path } from 'ramda'

export const theme = {
  lightGray: '#c5c5c5',
  purple: '#3f01d2',
  lightRed: '#bb4462',
  green: '#02a590',
  orange: '#e78834',
  white: '#ffffff',
  black: '#000000',
  borderRadius: '5px',
} as const

type themeKey = keyof typeof theme

export const themeProp = (prop: themeKey) => path<string>(['theme', prop])
