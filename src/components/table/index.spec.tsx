import { Table } from '.'
import { render, screen } from '@testing-library/react'
import { MockFactory } from '../../../__mocks__/mockFactory'
import { Project } from '@/utils/types/dashboard'
import { faker } from '@faker-js/faker'

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

describe('<Table/>', () => {
  it('should render the table correctly', () => {
    const projects = mockProjects.getMockList(1)
    render(<Table projects={projects} />)

    const name = screen.getByText(projects[0].name)
    const isPublic = screen.getByText(projects[0].isPublic ? 'Yes' : 'No')

    expect(name).toBeInTheDocument()
    expect(isPublic).toBeInTheDocument()
  })

  it('should render the loading spinner if the projects are undefined', () => {
    render(<Table projects={undefined} />)

    const loading = screen.getByTestId('loading')
    expect(loading).toBeInTheDocument()
  })

  it('should render an empty message if projects are empty', () => {
    render(<Table projects={[]} />)

    expect(screen.getByText('Create')).toBeInTheDocument()
    expect(screen.getByText('your')).toBeInTheDocument()
    expect(screen.getByText('first')).toBeInTheDocument()
    expect(screen.getByText('project')).toBeInTheDocument()
  })
})
