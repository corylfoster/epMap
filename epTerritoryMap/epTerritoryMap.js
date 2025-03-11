import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  ClickableImage,
  ExtraLargeHeader,
  MainHeader,
  MarkdownParagraph,
} from 'components'
import mapData from './mapData'
import { statePaths, territories } from './statePathsAndTerritories'
import EpTerritoryMapPopoutController from '../epTerritoryMapPopoutController/epTerritoryMapPopoutController'

const mobileBreakpoint = `@media (max-width: 767px)`

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`

const MapWrapper = styled.div`
  border-top: 0.125rem solid #f1f1f1;
  border-bottom: 0.125rem solid #f1f1f1;
  margin-top: 1.25rem;
  padding-top: 3.125rem;
  padding-bottom: 2.5rem;
  ${mobileBreakpoint} {
    padding-top: 0;
  }
`

const SvgMap = styled.svg`
  display: block;
  margin: 0 auto;
  ${mobileBreakpoint} {
    display: none;
  }
`

const MobileMap = styled(ClickableImage)`
  display: none;
  ${mobileBreakpoint} {
    display: block;
  }
`

const MainHeaderStyled = styled(MainHeader)`
  font-size: 3rem;
  line-height: 3.625rem;
  margin-bottom: 0.625rem;
  ${mobileBreakpoint} {
    margin-bottom: 0.9375rem;
  }
`

const ExtraLargeHeaderStyled = styled(ExtraLargeHeader)`
  font-size: 1.5rem;
  line-height: 2rem;
  font-family: ${({ theme }) => theme.headerFontSemibold};
  margin-bottom: 1.25rem;
`

const MarkdownParagraphStyled = styled(MarkdownParagraph)`
  display: flex;
  align-self: center;
  width: 70%;
  ${mobileBreakpoint} {
    width: 100%;
  }
`

const Territory = styled.g``

const StateGroup = styled.g`
  cursor: pointer;
  &:focus {
    outline: none;
  }
`

const Path = styled.path`
  fill: ${({ isHovered, othersHovered, fillColor }) =>
    isHovered || !othersHovered ? fillColor : '#eee'};
  stroke: #000;
  stroke-width: 1;
`

const Abbr = styled.text`
  font-family: ${({ theme }) => theme.textFontRegular};
  font-size: 0.875rem;
  text-anchor: middle;
  dominant-baseline: middle;
  fill: ${({ isHovered, othersHovered }) =>
    isHovered || !othersHovered ? '#000' : '#888'};
`

const Line = styled.line`
  fill: none;
  stroke-width: 0.1rem;
  stroke: #231f20;
`

const State = ({
  hoveredTerritory,
  id,
  onClick,
  othersHovered,
  setOthersHovered,
  setHoveredTerritory,
  territory,
  abbrX,
  abbrY,
  lineX1,
  lineX2,
  lineY1,
  lineY2,
}) => (
  <StateGroup
    id={id}
    role="button"
    tabIndex="0"
    onMouseEnter={() => {
      setHoveredTerritory(territory)
      setOthersHovered(true)
    }}
    onMouseLeave={() => {
      setHoveredTerritory(null)
      setOthersHovered(false)
    }}
    onClick={onClick}
    onKeyDown={event => {
      if (event.key === 'Enter') {
        onClick()
      }
    }}
  >
    <title>{id}</title>
    <Path
      data-id={id}
      d={statePaths[id]}
      othersHovered={othersHovered}
      isHovered={hoveredTerritory === territory}
      fillColor={territories[territory].fillColor}
      data-testid={id}
      aria-label={`Clicking here opens a modal window with contact information for our representative for ${id}`}
    />
    {id && (
      <Abbr
        x={abbrX}
        y={abbrY}
        othersHovered={othersHovered}
        isHovered={hoveredTerritory === territory}
      >
        {id}
      </Abbr>
    )}
    {lineX1 && <Line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} />}
  </StateGroup>
)

function EpTerritoryMap({ mobileImage, modals, text, title, title2 }) {
  const [hoveredTerritory, setHoveredTerritory] = useState(null)
  const [othersHovered, setOthersHovered] = useState(false)
  const [openModal, setOpenModal] = useState(null)

  const handleClick = territory => {
    setOpenModal(territory)
  }

  return (
    <Wrapper>
      {modals.map(modal => (
        <EpTerritoryMapPopoutController
          key={modal.territory}
          territory={modal.territory}
          epReps={modal.epReps}
          modalIsOpen={openModal === modal.territory}
          closeModal={() => setOpenModal(null)}
        />
      ))}
      <MainHeaderStyled center>{title}</MainHeaderStyled>
      <ExtraLargeHeaderStyled center>{title2}</ExtraLargeHeaderStyled>
      <MarkdownParagraphStyled center>{text}</MarkdownParagraphStyled>
      <MapWrapper>
        <MobileMap
          alt={mobileImage?.description}
          url={mobileImage?.file?.url}
        />
        <SvgMap xmlns="http://www.w3.org/2000/svg" viewBox="0,0 1000,589">
          <g transform="translate(-70, 0)">
            {mapData.map(territory => (
              <Territory key={territory.name}>
                {territory.states.map(state => (
                  <State
                    key={state.id}
                    id={state.id}
                    territory={territory.name}
                    abbrX={state.abbrX}
                    abbrY={state.abbrY}
                    lineX1={state.lineX1}
                    lineX2={state.lineX2}
                    lineY1={state.lineY1}
                    lineY2={state.lineY2}
                    othersHovered={othersHovered}
                    hoveredTerritory={hoveredTerritory}
                    setHoveredTerritory={setHoveredTerritory}
                    setOthersHovered={setOthersHovered}
                    onClick={() => handleClick(territory.name)}
                  />
                ))}
              </Territory>
            ))}
          </g>
        </SvgMap>
      </MapWrapper>
    </Wrapper>
  )
}

EpTerritoryMap.propTypes = {
  mobileImage: PropTypes.object.isRequired,
  modals: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
}

export default EpTerritoryMap
