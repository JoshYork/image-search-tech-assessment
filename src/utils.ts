import { converge, concat, pipe, head, toUpper, tail } from 'ramda'

export const capitalize = converge(concat, [pipe(head, toUpper), tail])
