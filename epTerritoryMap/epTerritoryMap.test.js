import { render, fireEvent, waitFor } from '@testing-library/react'
import EpTerritoryMap from './epTerritoryMap'

describe('EpTerritoryMap', () => {
  const modals = [
    { id: 0, territory: 'AZ, OR, WA', epReps: [{ repName: 'Frank' }] },
    { id: 1, territory: 'CA', epReps: [{ repName: 'Jane' }] },
  ]
  const text = 'This map does some things if you hover or click on it.'
  const title = 'Education Partnerships Territory Map'
  const title2 = 'Click on a territory to see the EPs in that area.'

  it('onMouseEnter and onMouseLeave work correctly', async () => {
    const { container } = render(
      <EpTerritoryMap
        modals={modals}
        text={text}
        title={title}
        title2={title2}
      />,
    )

    const az = container.querySelector('[data-testid="AZ"]')
    const ca = container.querySelector('[data-testid="CA"]')

    fireEvent.mouseEnter(az)

    await waitFor(() => {
      expect(ca).toHaveStyle('fill: #eee')
    })

    fireEvent.mouseLeave(az)

    await waitFor(() => {
      expect(ca).not.toHaveStyle('fill: #eee')
    })
  })

  it('updates openModal state when handleClick is called', async () => {
    const { getByTestId, getByText } = render(
      <EpTerritoryMap
        modals={modals}
        text={text}
        title={title}
        title2={title2}
      />,
    )

    const territoryAZ = getByTestId('AZ')
    fireEvent.click(territoryAZ)

    await waitFor(() => {
      const modalWindow = getByText('Frank')
      expect(modalWindow).toBeInTheDocument()
    })
    const territoryCA = getByTestId('CA')
    fireEvent.click(territoryCA)

    await waitFor(() => {
      const modalWindow = getByText('Jane')
      expect(modalWindow).toBeInTheDocument()
    })
  })
})
