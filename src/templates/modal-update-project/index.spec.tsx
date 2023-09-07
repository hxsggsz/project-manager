import { QueryClient, QueryClientProvider } from 'react-query'
import { ModalUpdateProject } from '.'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useUpdateProject } from '../../hooks/useProject'

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const mockedUpdateProject = useUpdateProject as jest.Mock<any>

jest.mock('../../hooks/useProject')

const setIsOpen = jest.fn()
const queryClient = new QueryClient()

export const ModalProjComponent = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <ModalUpdateProject isOpen setIsOpen={setIsOpen} />
    </QueryClientProvider>,
  )
}

describe('<ModalUpdateProject/>', () => {
  beforeEach(() => {
    mockedUpdateProject.mockImplementation(() => ({}))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should not render the modal if is close', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ModalUpdateProject isOpen={false} setIsOpen={setIsOpen} />
      </QueryClientProvider>,
    )

    expect(screen.queryByText('Update project')).not.toBeInTheDocument()
  })

  it('should render the modal if is open', () => {
    window.ResizeObserver = ResizeObserver
    ModalProjComponent()

    expect(screen.queryByText('Update project')).toBeInTheDocument()
  })

  it('should get a input validation error if the content is less than 5', async () => {
    window.ResizeObserver = ResizeObserver
    ModalProjComponent()

    const input = screen.findByPlaceholderText(/best project name/i)
    const submit = screen.findByText('Update')
    const validationError = screen.findByText(
      /it is necessary to have at least 5 characters/i,
    )

    userEvent.type(await input, 'a')
    fireEvent.submit(await submit)

    expect(await validationError).toBeInTheDocument()
  })

  it('should create  a new project correctly', async () => {
    window.ResizeObserver = ResizeObserver
    ModalProjComponent()

    const input = screen.findByPlaceholderText('Best project name')
    const submit = screen.findByText('Update')

    userEvent.type(await input, 'project test')
    fireEvent.submit(await submit)

    await waitFor(() => expect(useUpdateProject).toHaveBeenCalled())
  })

  it('should show the info modal if hover on right text', async () => {
    window.ResizeObserver = ResizeObserver
    ModalProjComponent()

    const hover = screen.findByText('This project is public?')
    const hoverText = screen.findByText(
      'This mean that everyone with the link of this project can access it and it tasks but cannot make any new tasks and chat',
    )

    expect(await screen.findByText('Update project')).toBeInTheDocument()
    await act(async () => userEvent.hover(await hover))
    expect(await hoverText).toBeInTheDocument()
  })
})
