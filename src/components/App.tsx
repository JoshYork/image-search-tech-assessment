import React from 'react'
import styled from 'styled-components'
import { filter, where } from 'ramda'
import { notEqual } from 'ramda-adjunct'
import { Search } from './Search'
import { Results } from './Results'
import { Saved } from './Saved'
import { Keywords, Category, ImageResult, ImageResults } from '../types'
import { fetchPixabyImages } from '../api'

const Container = styled.div`
  display: flex;
  height: 100%;
`
const ScrollArea = styled.div`
  flex-basis: 70%;
  overflow-y: auto;
  height: 100%;
  padding: 1rem;
`

const StyledSearch = styled(Search)`
  margin-bottom: 2rem;
`

const StyledSaved = styled(Saved)`
  overflow-y: auto;
  flex-basis: 30%;
  height: 100%;
`

export const App = () => {
  const [imageResults, setImageResults] = React.useState<ImageResults>([])
  const [savedImages, setSavedImages] = React.useState<ImageResults>([])

  const handleSearch = (keywords: Keywords, category?: Category) =>
    fetchPixabyImages(keywords, category).then(setImageResults)

  const handleImageSave = (imageResult: ImageResult) =>
    setSavedImages([...savedImages, imageResult])

  const handleImageRemoval = (imageResult: ImageResult) =>
    setSavedImages(filter(where({ id: notEqual(imageResult.id) }), savedImages))

  return (
    <Container>
      <ScrollArea>
        <StyledSearch handleSearch={handleSearch} />
        <Results
          imageResults={imageResults}
          savedImages={savedImages}
          handleImageSave={handleImageSave}
          handleImageRemoval={handleImageRemoval}
        />
      </ScrollArea>
      <StyledSaved savedImages={savedImages} />
    </Container>
  )
}
