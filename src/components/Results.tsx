import styled from 'styled-components'
import { isEmpty, pipe, propOr, split, any, whereEq } from 'ramda'
import { ImageResult, ImageResults } from '../types'
import { themeProp } from '../theme'
import { ReactComponent as ThumbsUp } from '../icons/thumbsUp.svg'
import { ReactComponent as Star } from '../icons/star.svg'

type ResultsProps = {
  className?: string
  imageResults: ImageResults | null
  savedImages: ImageResults
  handleImageSave: (imageResult: ImageResult) => void
  handleImageRemoval: (imageResult: ImageResult) => void
}

const Result = styled.div`
  display: grid;
  column-gap: 1rem;
  grid-template-columns: 1fr 0.7fr;
  grid-template-rows: auto auto;
  margin-bottom: 3rem;
`

const Tags = styled.div`
  grid-row: 1;
  display: flex;
  flex-wrap: wrap;
  justify-self: start;
  align-self: start;
  margin: -0.25rem;
`

const Tag = styled.div`
  padding: 0.25rem 0.5rem;
  background-color: ${themeProp('green')};
  font-size: 0.75rem;
  color: ${themeProp('white')};
  border-radius: 2px;
  margin: 0.25rem;
`

const ImageContainer = styled.div`
  position: relative; // context for save button
  grid-row: 1 / span 2;
`

const SaveButton = styled.button<{ isSaved: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  border: 0;
  padding: 0.5rem 0.75rem;
  background-color: ${(props) =>
    props.isSaved ? props.theme.orange : props.theme.lightRed};
  color: ${themeProp('white')};
`

const Image = styled.img`
  width: 100%;
`

const StatsSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  grid-row: 2;
  font-size: 0.75rem;
  justify-self: start;
  align-self: end;
  margin-top: 1rem;
`

const Stat = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.25rem;
  align-items: center;
`

export const Results: React.FC<ResultsProps> = ({
  className,
  imageResults,
  savedImages,
  handleImageSave,
  handleImageRemoval,
}) => {
  if (!imageResults || isEmpty(imageResults)) {
    return (
      <div>
        Enter at least one keyword above and click search to see results.
      </div>
    )
  }

  return (
    <div className={className}>
      {imageResults.map((imageResult) => {
        const tags = pipe(propOr('', 'tags'), split(', '))(imageResult)
        const isSaved = any(whereEq({ id: imageResult.id }), savedImages)
        const saveHandler = isSaved ? handleImageRemoval : handleImageSave

        return (
          <Result key={imageResult.id}>
            <ImageContainer>
              <Image src={imageResult.webformatURL} />
              <SaveButton
                isSaved={isSaved}
                onClick={() => saveHandler(imageResult)}
              >
                {isSaved ? 'Saved' : 'Save'}
              </SaveButton>
            </ImageContainer>
            <Tags>
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}{' '}
            </Tags>
            <StatsSection>
              <Stat>
                <div>{imageResult.likes}</div>{' '}
                <ThumbsUp width={16} height={16} fill="#000000" />
              </Stat>
              <Stat>
                <div>{imageResult.favorites}</div>
                <Star width={16} height={16} fill="#000000" />
              </Stat>
            </StatsSection>
          </Result>
        )
      })}
    </div>
  )
}
