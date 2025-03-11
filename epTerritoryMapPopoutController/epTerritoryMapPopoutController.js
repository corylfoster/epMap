import React, { useEffect } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ClickableImage, MarkdownParagraph, MediumHeader } from 'components'
import { territories } from '../epTerritoryMap/statePathsAndTerritories'

const closeTimeoutMS = 350

const EpTerritoryMapPopoutController = ({
  children,
  closeModal,
  epReps,
  modalIsOpen,
  territory,
}) => {
  useEffect(() => {
    Modal.setAppElement('body')
  }, [])

  const openModal = () => {
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = () => {
    closeModal()
    document.body.style.overflow = 'visible'
  }

  return (
    <>
      <TerritoryMapPopoutButtonWrapper onClick={openModal}>
        {children}
      </TerritoryMapPopoutButtonWrapper>
      <StyledModal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
        <TerritoryMapPopout
          closeModal={closeModal}
          epReps={epReps}
          territory={territory}
        />
      </StyledModal>
    </>
  )
}

EpTerritoryMapPopoutController.propTypes = {
  children: PropTypes.object.isRequired,
  closeModal: PropTypes.func,
  epReps: PropTypes.array,
  modal: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool,
  territory: PropTypes.string,
}

// Overides default inline styles
function ReactModalAdapter({ className, ...props }) {
  const contentClassName = className
  const overlayClassName = className
  return (
    <Modal
      className={contentClassName}
      closeTimeoutMS={closeTimeoutMS}
      overlayClassName={overlayClassName}
      portalClassName={className}
      {...props}
    />
  )
}

ReactModalAdapter.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
}

const StyledModal = styled(props => <ReactModalAdapter {...props} />).attrs({
  'data-testid': 'modal-wrapper',
})`
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ReactModal__Overlay--after-open {
    opacity: 1;
  }
  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
  .ReactModal__Overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
  }
  .ReactModal__Content {
    position: absolute;
    left: 50%;
    right: auto;
    bottom: auto;
    width: 100%;
    max-width: 34rem;
    transform: translate(-50%, -3%);
    border-radius: 0.375rem;
    background: #fff;
    overflow: auto;
    outline: none;
    box-shadow: 0 0.3125rem 0.9375rem rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 767px) {
    .ReactModal__Content {
      max-width: calc(100% - 1.875rem);
      box-sizing: border-box;
    }
  }
`

const TerritoryMapPopoutButtonWrapper = styled.button.attrs({
  'data-testid': 'modal-open-btn',
})`
  cursor: pointer;
  border: none;
  width: 100%;
  background: transparent;
  border: none;
  padding: 0;
  outline: none;
  display: flex;
  margin-top: auto;
`

const TerritoryMapPopout = props => {
  const { closeModal, epReps } = props

  return (
    <TerritoryMapPopoutWrapper>
      <ModalHeader>
        <ModalCloseButton onClick={closeModal}>
          <ModalCloseSpan>+</ModalCloseSpan>
        </ModalCloseButton>
      </ModalHeader>
      <ModalBody>
        <EpRepsContainer>
          {epReps.map(epRep => (
            <EpRep {...epRep} key={epRep.id} />
          ))}
        </EpRepsContainer>
      </ModalBody>
      <ModalFooter />
    </TerritoryMapPopoutWrapper>
  )
}

TerritoryMapPopout.propTypes = {
  closeModal: PropTypes.func.isRequired,
  epReps: PropTypes.array,
}

const TerritoryMapPopoutWrapper = styled.div``

const ModalHeader = styled.div`
  padding: 0.4375rem 0.8125rem 0 2.5rem;
  margin-bottom: 1.875rem;
  h4 {
    margin-bottom: 0;
  }
  @media (max-width: 375px) {
    padding: 0.4375rem 0.8125rem 0 1rem;
  }
`

const ModalCloseButton = styled.button.attrs({
  'data-testid': 'modal-close-btn',
})`
  padding: 0;
  cursor: pointer;
  border: 0;
  float: right;
  line-height: 1;
  color: #000;
  opacity: 0.2;
  background: transparent;

  &:hover {
    opacity: 0.5;
  }
`

const ModalCloseSpan = styled.span`
  display: block;
  font-family: ${({ theme }) => `${theme.textFontRegular}, sans-serif`};
  transform: rotate(45deg);
  font-size: 2.5rem;
`

const ModalBody = styled.div`
  padding: 0 2.5rem;
  box-sizing: border-box;
  @media (max-width: 375px) {
    padding: 0 1rem;
  }
`

const ModalFooter = styled.div`
  padding: 0.9375rem;
`

const EpRepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > :not(:first-child) {
    margin-top: 1.25rem;
  }
`

const EpRep = ({ center, image, repEmail, repPhoneNumber, repTerritory, repName }) => {
  return (
    <EpRepWrapper center={center}>
      {!!image && (
        <ClickableImageStyled url={image?.file?.url} alt={image?.description} />
      )}
      <RepText>
        <RepName center={center}>{repName}</RepName>
        <RepContact center={center}>{repEmail}</RepContact>
        <RepContact>{repPhoneNumber}</RepContact>
        {!!repTerritory && (
        <Territory>
          <Circle territory={repTerritory} />
          <RepContact>{repTerritory}</RepContact>
        </Territory>)}
      </RepText>
    </EpRepWrapper>
  )
}

EpRep.propTypes = {
  description: PropTypes.string,
  image: PropTypes.object,
  repContact: PropTypes.string,
  repName: PropTypes.string,
  repTerritory: PropTypes.string,
}

const EpRepWrapper = styled.div.attrs({
  'data-testid': 'ep-rep',
})`
  display: flex;
  flex-direction: row;
  padding: ${({ center }) => (center ? '0 3.8rem' : '0')};
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 0;
  }
`
const RepText = styled.div`
  display: flex;
  flex-direction: column;
`
const ClickableImageStyled = styled(ClickableImage)`
  width: 7.5rem;
  min-width: 7.5rem;
  margin-right: 1.875rem;
  margin-top: 0.3125rem;
  align-self: flex-start;
`

const RepName = styled(MediumHeader)`
  margin-bottom: 0.3125rem;
`

const RepContact = styled(MarkdownParagraph)`
  p {
    margin-bottom: 0;
  }
`

const Territory = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.625rem;
`

const Circle = styled.div`
  display: inline-block;
  margin-right: 0.625rem;
  position: relative;
  top: 0.3125rem;
  width: 1.25rem;
  height: 1.25rem;
  min-width: 1.25rem;
  min-height: 1.25rem;
  border-radius: 50%;
  border: 0.125rem solid #000;
  background-color: ${({ territory }) => {
    const territoryEntry = Object.values(territories).find(
      item => item.fullTerritoryName === territory,
    )
    return territoryEntry ? territoryEntry.fillColor : 'transparent'
  }};
`

export default EpTerritoryMapPopoutController
