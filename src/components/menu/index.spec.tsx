import { render, screen, waitFor } from '@testing-library/react'
import { MockFactory } from '../../../__mocks__/mockFactory'
import { MenuItem } from './types'
import { faker } from '@faker-js/faker'
import { Menu } from '.'
import userEvent from '@testing-library/user-event'

const mockMenuItems = new MockFactory<MenuItem>(() => ({
  name: faker.person.firstName(),
  onSelect: jest.fn(),
}))

const menuItems = mockMenuItems.getMockList(1)

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Menu', () => {
  describe('when intialize', () => {
    it('renders the component correctly', () => {
      render(
        <Menu items={[]}>
          <button>open</button>
        </Menu>,
      )
      const button = screen.getByRole('button', { name: 'open' })
      expect(button).toBeInTheDocument()
    })

    it('dont render the menu content when is close', () => {
      render(
        <Menu items={menuItems}>
          <button>open</button>
        </Menu>,
      )
      expect(screen.queryByText(menuItems[0].name)).not.toBeInTheDocument()
    })
  })

  describe('when click', () => {
    beforeAll(() => {
      window.ResizeObserver = ResizeObserver
    })
    it('opens the menu', async () => {
      render(
        <Menu items={menuItems}>
          <button>open</button>
        </Menu>,
      )

      const button = screen.getByRole('button', { name: 'open' })
      userEvent.click(button)

      await waitFor(() =>
        expect(screen.getByText(menuItems[0].name)).toBeInTheDocument(),
      )
    })

    it('calls the onSelect function when select one option', async () => {
      render(
        <Menu items={menuItems}>
          <button>open</button>
        </Menu>,
      )

      const button = screen.getByRole('button', { name: 'open' })
      userEvent.click(button)

      await waitFor(() =>
        expect(screen.getByText(menuItems[0].name)).toBeInTheDocument(),
      )

      userEvent.click(screen.getByText(menuItems[0].name))

      await waitFor(() =>
        expect(menuItems[0].onSelect).toHaveBeenCalledTimes(1),
      )
    })
  })
})
