import { Button } from '.'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Button/>', () => {
  describe('when initialize', () => {
    it('renders the button content', () => {
      render(<Button>test</Button>)
      const testButton = screen.getByText('test')
      expect(testButton).toBeVisible()
    })

    it('renders the loading button', () => {
      render(<Button isLoading>test</Button>)
      const loading = screen.getByTestId('loading')
      const buttonText = screen.queryByText('test')
      expect(loading).toBeVisible()
      expect(buttonText).not.toBeInTheDocument()
    })
  })

  describe('when click', () => {
    it('dispare click event', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>test</Button>)
      const buttonText = screen.getByText('test')
      userEvent.click(buttonText)
      await waitFor(() => expect(handleClick).toHaveBeenCalled())
    })
  })
})
