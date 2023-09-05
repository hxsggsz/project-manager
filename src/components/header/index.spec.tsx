import { Header } from '.'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { User } from '../../utils/types/dashboard'
import { MockFactory } from '../../../__mocks__/mockFactory'
import { faker } from '@faker-js/faker'

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
  describe('when initialize', () => {
    it('renders the component with all props correclty', () => {
      render(<Header user={mockUser.getMock()} navbarOpen />)

      const HeaderText = screen.getByText(/project m/i)
      expect(HeaderText).toBeInTheDocument()
    })

    it('renders the component as navbar been closed', () => {
      render(<Header user={mockUser.getMock()} navbarOpen={false} />)

      const HeaderText = screen.queryByText(/project m/i)
      expect(HeaderText).not.toBeInTheDocument()
    })
  })

  describe('when click on menu', () => {
    it('opens correctly', async () => {
      window.ResizeObserver = ResizeObserver
      render(<Header user={mockUser.getMock()} navbarOpen />)

      const toggleMenu = screen.getByTestId(/headerMenu/i)
      const menuOption = screen.queryByTestId(/menu/i)

      userEvent.click(toggleMenu)

      await waitFor(() => {
        expect(menuOption).toBeInTheDocument()
      })
    })
  })
})
