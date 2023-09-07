import { render, screen, waitFor } from '@testing-library/react'
import { Switch } from '.'
import userEvent from '@testing-library/user-event'

describe('Switch', () => {
  describe('when initialize', () => {
    it('renders the switch correctly', () => {
      render(<Switch isChecked={false} setIsChecked={() => {}} />)

      const switchComponent = screen.getByTestId('switch')

      expect(switchComponent).not.toBeChecked()
      expect(switchComponent).toBeInTheDocument()
    })
  })

  describe('when click', () => {
    it('calls the setIsChecked function', async () => {
      const setIsCheckedMock = jest.fn()
      render(<Switch isChecked={true} setIsChecked={setIsCheckedMock} />)

      const switchComponent = screen.getByTestId('switch')
      userEvent.click(switchComponent)

      await waitFor(() => expect(setIsCheckedMock).toHaveBeenCalledTimes(1))
    })
  })
})
