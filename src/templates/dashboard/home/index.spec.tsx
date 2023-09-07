import { Home } from '.'
import { render, screen } from '@testing-library/react'
import { MockFactory } from '../../../../__mocks__/mockFactory'
import { Project } from '../../../utils/types/dashboard'
import { faker } from '@faker-js/faker'
import { QueryClient, QueryClientProvider } from 'react-query'

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

describe('<Home/>', () => {
  it('should open the create project modal', async () => {
    const queryclient = new QueryClient()
    const projects = mockProjects.getMockList(1)
    render(
      <QueryClientProvider client={queryclient}>
        <Home projects={projects} />
      </QueryClientProvider>,
    )

    const name = screen.getByText(projects[0].name)
    const isPublic = screen.getByText(projects[0].isPublic ? 'Yes' : 'No')

    expect(name).toBeInTheDocument()
    expect(isPublic).toBeInTheDocument()
  })
})
