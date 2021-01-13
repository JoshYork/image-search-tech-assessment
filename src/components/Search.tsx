import React from 'react'
import styled from 'styled-components'
import { pipe, pathOr, split, filter } from 'ramda'
import { isNotEmpty } from 'ramda-adjunct'
import { Spinner } from './Spinner'
import { categories, Keywords, Category } from '../types'
import { capitalize } from '../utils'
import { themeProp } from '../theme'
import { FetchError } from '../api'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`

const Input = styled.input`
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid ${themeProp('lightGray')};
  border-radius: ${themeProp('borderRadius')};

  &::placeholder {
    font-style: italic;
  }
`

const Select = styled.select`
  background-color: transparent;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${themeProp('lightGray')};
  border-radius: ${themeProp('borderRadius')};
  font-size: 1rem;
`

const SearchButton = styled.button`
  padding: 1rem 0.75rem;
  border-radius: ${themeProp('borderRadius')};
  border: 0;
  background-color: ${themeProp('purple')};
  color: ${themeProp('white')};
  font-size: 1rem;

  &:disabled {
    background-color: ${themeProp('lightGray')};
    color: ${themeProp('black')};
  }
`

const ErrorMessage = styled.div`
  color: ${themeProp('lightRed')};
  margin-top: 1rem;
`

type SearchProps = {
  className?: string
  handleSearch: (keywords: Keywords, category?: Category) => void
  isFetching: boolean
  fetchError: FetchError
  setError: (input: FetchError) => void
}

type CategoryState = Category | 'none'

export const Search: React.FC<SearchProps> = ({
  className,
  handleSearch,
  isFetching,
  fetchError,
  setError,
}) => {
  const [keywords, setKeywords] = React.useState<Array<string>>([])
  const [category, setCategory] = React.useState<CategoryState>('none')

  const handleKeywordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setError(null)
    pipe(
      pathOr('', ['target', 'value']),
      split(' '),
      filter(isNotEmpty),
      setKeywords,
    )(event)
  }

  const handleCategoryChange = pipe(
    pathOr<CategoryState>('none', ['target', 'value']),
    setCategory,
  )

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    handleSearch(keywords, category === 'none' ? undefined : category)
  }

  return (
    <Form className={className} onSubmit={handleSearchSubmit}>
      <Label htmlFor="keyword">Keywords</Label>
      <Input
        id="keyword"
        placeholder="Keywords..."
        maxLength={100}
        onChange={handleKeywordChange}
      />
      <Label htmlFor="category">Category</Label>
      <Select id="category" onChange={handleCategoryChange} value={category}>
        <option value="none">None</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {capitalize(category)}
          </option>
        ))}
      </Select>
      <SearchButton type="submit" disabled={keywords.length === 0}>
        {isFetching ? <Spinner /> : 'Search'}
      </SearchButton>
      {fetchError ? (
        <ErrorMessage>
          There was a problem fetching your results. Please try again.
        </ErrorMessage>
      ) : null}{' '}
    </Form>
  )
}
