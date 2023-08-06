import { User } from '@/utils/types/dashboard'
import { Header } from '.'
import { render, screen, waitFor } from '@testing-library/react'
import { MockFactory } from '../../../__mocks__/mockFactory'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

const mockUser = new MockFactory<User>(() => ({
  sub: faker.string.uuid(),
  name: faker.person.firstName(),
  username: faker.person.lastName(),
  profile_photo: faker.internet.url(),
}))

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('<Header/>', () => {
  it('should render the component with all props correclty', () => {
    render(<Header user={mockUser.getMock()} navbarOpen />)

    const HeaderText = screen.getByText(/project m/i)
    expect(HeaderText).toBeInTheDocument()
  })

  it('should render the component as navbar been closed', () => {
    render(<Header user={mockUser.getMock()} navbarOpen={false} />)

    const HeaderText = screen.queryByText(/project m/i)
    expect(HeaderText).not.toBeInTheDocument()
  })

  it('should open the menu correctly', async () => {
    window.ResizeObserver = ResizeObserver
    render(<Header user={mockUser.getMock()} navbarOpen />)

    const toggleMenu = screen.getByTestId(/headerMenu/i)
    const arrowDown = screen.queryByTestId(/down/i)
    const menuOption = screen.queryByTestId(/menu/i)

    expect(arrowDown).toBeInTheDocument()
    userEvent.click(toggleMenu)
    expect(await screen.findByTestId(/arrowup/i))

    await waitFor(() => {
      expect(arrowDown).not.toBeInTheDocument()
      expect(menuOption).toBeInTheDocument()
    })
  })
})
