import { act, render, screen } from '@testing-library/react'
import { PopUp } from '.'
import userEvent from '@testing-library/user-event'

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('PopUp', () => {
  describe('when initialize', () => {
    it('renders correctly', () => {
      render(<PopUp content="">test</PopUp>)
      expect(screen.getByText(/test/i)).toBeInTheDocument()
    })
  })

  describe('when hover', () => {
    beforeAll(() => {
      window.ResizeObserver = ResizeObserver
    })

    it('shows the content on screen', async () => {
      render(<PopUp content="this is the popup">test</PopUp>)

      expect(screen.queryByText(/this is the popup/i)).not.toBeInTheDocument()

      await act(async () => userEvent.hover(screen.getByText(/test/i)))

      expect(await screen.findByText(/this is the popup/i)).toBeVisible()
    })
  })
})
