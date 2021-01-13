import React from 'react'
import styled from 'styled-components'
import { pipe, pathOr, split, filter } from 'ramda'
import { isNotEmpty } from 'ramda-adjunct'
import { categories, Keywords, Category } from '../types'
import { capitalize } from '../utils'
import { themeProp } from '../theme'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: ${themeProp('lightGray')};
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

type SearchProps = {
  className?: string
  handleSearch: (keywords: Keywords, category?: Category) => void
}

type CategoryState = Category | 'none'

export const Search: React.FC<SearchProps> = ({ className, handleSearch }) => {
  const [keywords, setKeywords] = React.useState<Array<string>>([])
  const [category, setCategory] = React.useState<CategoryState>('none')

  const handleKeywordChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void = pipe(
    pathOr('', ['target', 'value']),
    split(' '),
    filter(isNotEmpty),
    setKeywords,
  )

  const handleCategoryChange = pipe(
    pathOr<CategoryState>('none', ['target', 'value']),
    setCategory,
  )

  return (
    <Container className={className}>
      <Label htmlFor="keyword">Keyword</Label>
      <Input
        id="keyword"
        placeholder="Keyword..."
        maxLength={100}
        onChange={handleKeywordChange}
      />

      <Label htmlFor="category">Category</Label>
      <Select
        id="category"
        onChange={handleCategoryChange}
        defaultValue="none"
        value={category}
      >
        <option value="none">None</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {capitalize(category)}
          </option>
        ))}
      </Select>
      <SearchButton
        onClick={() =>
          handleSearch(keywords, category === 'none' ? undefined : category)
        }
        disabled={keywords.length === 0}
      >
        Search
      </SearchButton>
    </Container>
  )
}
