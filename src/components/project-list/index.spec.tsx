import userEvent from '@testing-library/user-event'
import { ProjectList } from '.'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const mockDelete = jest.fn()
const projectListComponent = () => {
  const queryClient = new QueryClient()
  render(
    <QueryClientProvider client={queryClient}>
      <ProjectList id="123" item="test" handleDelete={mockDelete} />
    </QueryClientProvider>,
  )
}

describe('<ProjectList/>', () => {
  it('should render the component with all props correctly', () => {
    projectListComponent()

    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('should render the menu correctly', async () => {
    window.ResizeObserver = ResizeObserver
    projectListComponent()

    const button = screen.getByTestId('button')
    const menu = screen.findByText('Delete project')

    userEvent.hover(button)
    userEvent.click(button)

    expect(await menu).toBeInTheDocument()
  })

  it('should render the menu correctly', async () => {
    window.ResizeObserver = ResizeObserver
    projectListComponent()

    const button = screen.getByTestId('button')
    const deleteButton = screen.findByText('Delete project')

    userEvent.hover(button)
    userEvent.click(button)

    expect(await deleteButton).toBeInTheDocument()

    userEvent.click(await deleteButton)

    await waitFor(() => expect(mockDelete).toHaveBeenCalled())
  })
})
