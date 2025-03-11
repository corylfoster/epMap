import React from 'react'
import 'jest-styled-components'
import { EpRepresentativeList } from 'uniqueSections'
import { render, screen } from '@testing-library/react'

const testProps = {
  epRepresentatives: [
    {
      repName: 'Frank Franklin',
      repTerritory: 'New York',
      repEmail: 'email@email.com',
      repPhoneNumber: '123-456-7890',
    },
  ],
}

describe('EpRepresentativeList', () => {
  test('Renders the repName', () => {
    render(<EpRepresentativeList {...testProps} />)
    const repName = screen.getByText('Frank Franklin')
    expect(repName).toBeInTheDocument()
  })

  test('Renders the repTerritory', () => {
    render(<EpRepresentativeList {...testProps} />)
    const repTerritory = screen.getByText('— New York')
    expect(repTerritory).toBeInTheDocument()
  })

  test('Renders the repEmail', () => {
    render(<EpRepresentativeList {...testProps} />)
    const repEmail = screen.getByText('email@email.com')
    expect(repEmail).toBeInTheDocument()
  })

  test('Renders the repPhoneNumber', () => {
    render(<EpRepresentativeList {...testProps} />)
    const repPhoneNumber = screen.getByText('123-456-7890')
    expect(repPhoneNumber).toBeInTheDocument()
  })
})
