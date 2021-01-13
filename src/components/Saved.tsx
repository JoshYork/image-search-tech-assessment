import styled from 'styled-components'
import { ImageResults } from '../types'
import { themeProp } from '../theme'
import { ReactComponent as ExternalLinkIcon } from '../icons/externalLink.svg'

type SavedProps = {
  className?: string
  savedImages: ImageResults
}

const Container = styled.div`
  padding: 1rem;
`

const Header = styled.h2`
  margin: 0 0 1rem 0;
  font-weight: bold;
  color: ${themeProp('black')};
`

const Link = styled.a`
  display: block;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`

export const Saved: React.FC<SavedProps> = ({ className, savedImages }) => {
  return (
    <div className={className}>
      <Container>
        <Header>Saved</Header>
        {savedImages.map((imageResult) => (
          <Link
            key={imageResult.id}
            href={imageResult.largeImageURL}
            target="_blank"
            rel="external noreferrer"
          >
            #{imageResult.id}
            <ExternalLinkIcon width={16} height={16} stroke="currentColor" />
          </Link>
        ))}
      </Container>
    </div>
  )
}
