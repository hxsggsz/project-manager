import { AuthButtons } from '.'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<AuthButtons/>', () => {
  it('should render and call the button correctly', () => {
    render(<AuthButtons href="test-href">test</AuthButtons>)
    const button = screen.getByText('test')
    userEvent.click(button)

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('href', 'test-href')
  })
})
