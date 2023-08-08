import { QueryClient, QueryClientProvider } from 'react-query'
import { ModalAddProject } from '.'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useCreateProject } from '../../hooks/useProject'

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const mockedCreateProject = useCreateProject as jest.Mock<any>

jest.mock('../../hooks/useProject')

export const ModalProjComponent = () => {
  const queryClient = new QueryClient()
  render(
    <QueryClientProvider client={queryClient}>
      <ModalAddProject>
        <button>open</button>
      </ModalAddProject>
    </QueryClientProvider>,
  )
}

describe('<ModalAddProject/>', () => {
  beforeEach(() => {
    mockedCreateProject.mockImplementation(() => ({}))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should not render the modal if is close', () => {
    ModalProjComponent()

    expect(screen.getByText('open')).toBeInTheDocument()
    expect(screen.queryByText('Create new project')).not.toBeInTheDocument()
  })

  it('should render the modal if is open', async () => {
    window.ResizeObserver = ResizeObserver
    ModalProjComponent()

    const button = screen.getByText('open')
    expect(button).toBeInTheDocument()

    userEvent.click(button)

    expect(await screen.findByText('Create new project')).toBeInTheDocument()
  })

  it('should get a input validation error if the content is less than 5', async () => {
    ModalProjComponent()

    const input = screen.findByPlaceholderText(/best project name/i)
    const submit = screen.findByText('Create')
    const button = screen.getByText('open')
    const validationError = screen.findByText(
      /it is necessary to have at least 5 characters/i,
    )

    userEvent.click(button)

    userEvent.type(await input, 'a')
    fireEvent.submit(await submit)

    expect(await validationError).toBeInTheDocument()
  })

  it('should create  a new project correctly', async () => {
    ModalProjComponent()

    const input = screen.findByPlaceholderText('Best project name')
    const submit = screen.findByText('Create')
    const button = screen.getByText('open')

    userEvent.click(button)

    userEvent.type(await input, 'project test')
    fireEvent.submit(await submit)

    await waitFor(() => expect(useCreateProject).toHaveBeenCalled())
  })

  it('should show the info modal if hover on right text', async () => {
    window.ResizeObserver = ResizeObserver
    ModalProjComponent()

    const button = screen.getByText('open')
    const hover = screen.findByText('This project is public?')
    const hoverText = screen.findByText(
      'This mean that everyone with the link of this project can access it and it tasks but cannot make any new tasks and chat',
    )
    expect(button).toBeInTheDocument()

    userEvent.hover(button)
    userEvent.click(button)

    expect(await screen.findByText('Create new project')).toBeInTheDocument()
    userEvent.hover(await hover)
    expect(await hoverText).toBeInTheDocument()
  })
})
