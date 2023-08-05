import { Button } from '.'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  it('should render the button content', () => {
    render(<Button>test</Button>)
    const testButton = screen.getByText('test')
    expect(testButton).toBeVisible()
  })

  it('should render the loading button', () => {
    render(<Button isLoading>test</Button>)
    const loading = screen.getByTestId('loading')
    const buttonText = screen.queryByText('test')
    expect(loading).toBeVisible()
    expect(buttonText).not.toBeInTheDocument()
  })

  it('should click the button and dispare click event', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>test</Button>)
    const buttonText = screen.getByText('test')
    userEvent.click(buttonText)
    await waitFor(() => expect(handleClick).toHaveBeenCalled())
  })
})
