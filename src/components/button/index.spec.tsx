import { Button } from '.'
import { render, screen } from '@testing-library/react'

describe('Button', () => {
  it('should render the button content', () => {
    render(<Button>teste</Button>)
    const testButton = screen.getByText('teste')
    expect(testButton).toBeVisible()
  })

  it('should render the loading button', () => {
    render(<Button isLoading>teste</Button>)
    const loading = screen.getByTestId('loading')
    expect(loading).toBeVisible()
  })
})
