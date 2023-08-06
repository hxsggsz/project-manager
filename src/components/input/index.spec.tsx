import { Input } from '.'
import { At } from '@phosphor-icons/react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Input/>', () => {
  it('should render the icon of the input', () => {
    render(<Input.Icon icon={At} />)

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should type correctly on input', () => {
    render(<Input.Input placeholder="test" />)

    const input = screen.getByPlaceholderText('test')

    fireEvent.input(input, { target: { value: 'test' } })

    expect(screen.getByDisplayValue('test')).toBeInTheDocument()
  })

  it('should show the password if click on button', async () => {
    const isShow = false
    const handleShow = jest.fn().mockReturnValue({ isShow: true })
    render(
      <Input.Password
        IsShowPassword={isShow}
        handleShowPassword={handleShow}
      />,
    )

    const button = screen.getByTestId('button')

    userEvent.click(button)

    await waitFor(() => expect(handleShow).toHaveBeenCalled())
  })
})
