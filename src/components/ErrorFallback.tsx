import React from 'react'
import styled from 'styled-components'
import { FallbackProps } from 'react-error-boundary'

const Container = styled.div`
  margin: 2rem;
`
const ErrorMessage = styled.h1`
  font-weight: bold;
`

export const ErrorFallback: React.FC<FallbackProps> = ({
  resetErrorBoundary,
}) => {
  console.log('fallback render')
  return (
    <Container>
      <ErrorMessage>Something went wrong.</ErrorMessage>
      <button onClick={resetErrorBoundary}>Reset and try again</button>
    </Container>
  )
}
