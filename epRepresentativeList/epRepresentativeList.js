import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MarkdownParagraph } from 'components'
import { territories } from '../epTerritoryMap/statePathsAndTerritories'

export default function EpRepresentativeList({ epRepresentatives }) {
  return (
    <Wrapper>
      <EpRepsContainer>
        {epRepresentatives.map(epRep => (
          <EpRep {...epRep} key={epRep.id} />
        ))}
      </EpRepsContainer>
    </Wrapper>
  )
}

EpRepresentativeList.propTypes = {
  epRepresentatives: PropTypes.array.isRequired,
}

const Wrapper = styled.section`
`

const EpRepsContainer = styled.div`
  column-count: 2;
  column-gap: 3.75rem;
  div {
    break-inside: avoid;
  }
  @media (max-width: 767px) {
    column-count: 1;
    column-gap: 0;
  }
`

const EpRep = ({ repEmail, repPhoneNumber, repTerritory, repName }) => {
  return (
    <EpRepWrapper>
      <Circle territory={repTerritory} />
      <RepText>
        <RepName>{`<span>${repName}</span> — ${repTerritory}`}</RepName>
        <RepContact>{`<span>${repEmail}</span> <span>${repPhoneNumber}</span>`}</RepContact>
      </RepText>
    </EpRepWrapper>
  )
}

EpRep.propTypes = {
  repContact: PropTypes.string,
  repName: PropTypes.string,
  repTerritory: PropTypes.string,
}

const EpRepWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1.25rem;
  align-items: flex-start;
`
const Circle = styled.div`
  display: inline-block;
  position: relative;
  top: 0.3125rem;
  margin-right: 0.625rem;
  width: 1.875rem;
  height: 1.875rem;
  min-width: 1.875rem;
  min-height: 1.875rem;
  border-radius: 50%;
  border: 0.125rem solid #000;
  background-color: ${({ territory }) => {
    const territoryEntry = Object.values(territories).find(
      item => item.fullTerritoryName === territory,
    )
    return territoryEntry ? territoryEntry.fillColor : 'transparent'
  }};
`

const RepText = styled.div`
  display: flex;
  flex-direction: column;
`

const RepName = styled(MarkdownParagraph)`
  margin-bottom: 0;
  p {
    margin-bottom: 0;
  }
  span {
    font-family: ${({ theme }) => theme.textFontMedium};
  }
`

const RepContact = styled(MarkdownParagraph)`
  display: flex;
  flex-direction: row;
  span {
    margin-right: 0.625rem;
  }
  @media (max-width: 767px) {
    span {
      display: block;
    }
  }
`
