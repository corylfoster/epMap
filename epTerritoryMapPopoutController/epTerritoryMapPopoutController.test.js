import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import EpTerritoryMapPopoutController from './epTerritoryMapPopoutController'

describe('EpTerritoryMapPopoutController', () => {
  const mockCloseModal = jest.fn()

  const props = {
    closeModal: mockCloseModal,
    epReps: [
      {
        id: 0,
        repName: 'Frank Franklin',
        repTerritory: 'Illinois, New York',
        repEmail: 'email@email.com',
        repPhoneNumber: '123-456-7890',
      },
      {
        id: 1,
        repName: 'Franklin Frank',
        repTerritory: 'Illinois, New York',
        repEmail: 'email@email.com',
        repPhoneNumber: '123-456-7890',
      },
    ],
    modalIsOpen: false,
    territory: 'IL, NY',
  }

  it('opens the modal when the button is clicked', () => {
    const { getByTestId } = render(
      <EpTerritoryMapPopoutController {...props} />,
    )
    const button = getByTestId('modal-open-btn')
    fireEvent.click(button)
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('renders the correct number of EpRep components', () => {
    const { getAllByTestId } = render(
      <EpTerritoryMapPopoutController {...props} modalIsOpen={true} />,
    )
    const epReps = getAllByTestId('ep-rep')
    expect(epReps.length).toBe(props.epReps.length)
  })
  it('closes the modal when the close button is clicked', () => {
    const { getByTestId } = render(
      <EpTerritoryMapPopoutController {...props} modalIsOpen={true} />,
    )
    const closeButton = getByTestId('modal-close-btn')
    fireEvent.click(closeButton)
    expect(mockCloseModal).toHaveBeenCalled()
  })
})
