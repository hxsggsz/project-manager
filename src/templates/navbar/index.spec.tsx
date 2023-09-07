import { Navbar } from '.'
import { render, screen, waitFor } from '@testing-library/react'
import { MockFactory } from '../../../__mocks__/mockFactory'
import { Project } from '../../utils/types/dashboard'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  useDeleteProject,
  useCreateProject,
  useUpdateProject,
} from '../../hooks/useProject'

const mockeUseRouter = useRouter as jest.Mock<any>
const mockeUseCreateProject = useCreateProject as jest.Mock<any>
const mockeUseUpdateProject = useUpdateProject as jest.Mock<any>
const mockeUseDeleteProject = useDeleteProject as jest.Mock<any>

jest.mock('../../hooks/useProject', () => ({
  useCreateProject: jest.fn(),
  useUpdateProject: jest.fn(),
  useDeleteProject: jest.fn(),
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue('router'),
}))

const mockProjects = new MockFactory<Project>(() => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  userId: faker.string.uuid(),
  isPublic: faker.datatype.boolean(),
  createdAt: faker.date.anytime(),
  _count: {
    participants: faker.number.int(),
  },
}))

describe('<Navbar/>', () => {
  beforeEach(() => {
    mockeUseRouter.mockImplementation(() => ({}))
    mockeUseCreateProject.mockImplementation(() => ({}))
    mockeUseUpdateProject.mockImplementation(() => ({}))
    mockeUseDeleteProject.mockImplementation(() => ({}))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should not render the projects if navbar is close', () => {
    const mockOpen = jest.fn()
    const projects = mockProjects.getMockList(1)
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <Navbar isOpen={false} handleOpen={mockOpen} projects={projects} />
      </QueryClientProvider>,
    )

    expect(screen.queryByText(projects[0].name)).not.toBeInTheDocument()
  })

  it('should render the projects if navbar is open', async () => {
    const mockOpen = jest.fn()
    const projects = mockProjects.getMockList(1)
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <Navbar isOpen={true} handleOpen={mockOpen} projects={projects} />
      </QueryClientProvider>,
    )

    expect(screen.getByText(projects[0].name)).toBeInTheDocument()
  })

  it('should not render the projects if navbar is close', async () => {
    const mockOpen = jest.fn()
    const projects = mockProjects.getMockList(1)
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <Navbar isOpen={true} handleOpen={mockOpen} projects={projects} />)
      </QueryClientProvider>,
    )
    const button = screen.getByTestId('buttonOpenNav')

    userEvent.click(button)

    await waitFor(() => expect(mockOpen).toHaveBeenCalled())
  })
})
