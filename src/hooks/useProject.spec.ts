import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { wrapper } from '../../__mocks__/hook-wrapper'
import { api } from '../lib/api'
import { MockFactory } from '../../__mocks__/mockFactory'
import { faker } from '@faker-js/faker'
import MockAdapter from 'axios-mock-adapter'
import {
  useCreateProject,
  useGetProjects,
  useUpdateProject,
  useDeleteProject,
} from './useProject'
import { Projects } from '../utils/types/dashboard'

const mockProjects = new MockFactory<Projects>(() => ({
  projects: [
    {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      name: faker.person.firstName(),
      createdAt: faker.date.anytime(),
      _count: {
        participants: faker.number.int(),
      },
      isPublic: faker.datatype.boolean(),
    },
  ],
}))
const mock = new MockAdapter(api)

beforeAll(() => {
  mock.reset()
})

afterEach(cleanup)

describe('useGetProjects hook', () => {
  it('should get the projects', async () => {
    const projects = mockProjects.getMock()
    mock.onGet('/project/1').reply(200, projects)
    const { result } = renderHook(() => useGetProjects('1'), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() => expect(result.current.status).toBe('success'))
    await waitFor(() =>
      expect(result.current.data?.projects[0].name).toBe(
        projects.projects[0].name,
      ),
    )
  })
})

describe('useCreateProject', () => {
  it('should create an project', async () => {
    const projects = mockProjects.getMock()
    mock.onPost('/project/1').reply(201, projects)

    const { result } = renderHook(() => useCreateProject('1'), { wrapper })

    await act(async () => {
      result.current.mutate({
        name: faker.person.firstName(),
        isPublic: faker.datatype.boolean(),
      })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() =>
      expect(result.current.data?.data.projects[0].name).toBe(
        projects.projects[0].name,
      ),
    )
    await waitFor(() => expect(result.current.status).toBe('success'))
  })

  it('should get an error', async () => {
    mock.onPost('/project/1').reply(500)

    const { result } = renderHook(() => useCreateProject('1'), { wrapper })

    await act(async () => {
      result.current.mutate({
        name: faker.person.firstName(),
        isPublic: faker.datatype.boolean(),
      })
    })

    await waitFor(() => expect(result.current.data).toBeUndefined())
    await waitFor(() => expect(result.current.isSuccess).toBe(false))
    await waitFor(() => expect(result.current.isError).toBe(true))
    await waitFor(() => expect(result.current.status).toBe('error'))
  })
})

describe('usechangeOption hook', () => {
  it('should update the project', async () => {
    const projects = mockProjects.getMock()
    const mockId = faker.string.uuid()
    mock.onPut('/project/' + mockId).reply(200, projects)

    const { result } = renderHook(() => useUpdateProject(), { wrapper })

    await act(async () => {
      result.current.mutate({
        isPublic: faker.datatype.boolean(),
        name: faker.person.firstName(),
        projectId: mockId,
      })
    })

    await waitFor(() =>
      expect(result.current.data?.data.projects[0].name).toBe(
        projects.projects[0].name,
      ),
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() => expect(result.current.status).toBe('success'))
  })

  it('should not change the current user', async () => {
    const { result } = renderHook(() => useUpdateProject(), { wrapper })

    mock.onPut('/project/1').reply(500)
    await act(async () => {
      result.current.mutate({
        isPublic: faker.datatype.boolean(),
        name: faker.person.firstName(),
        projectId: faker.string.uuid(),
      })
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    await waitFor(() => expect(result.current.data?.data).toBeUndefined())
    await waitFor(() => expect(result.current.status).toBe('error'))
  })
})

describe('useDeleteOption hook', () => {
  it('should delete the project', async () => {
    mock.onDelete('/project/1').reply(200)
    const { result } = renderHook(() => useDeleteProject(), { wrapper })

    await act(async () => {
      result.current.mutate('1')
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() => expect(result.current.data?.data).toBeUndefined())
    await waitFor(() => expect(result.current.status).toBe('success'))
  })

  it('should not delete the project and get an error', async () => {
    mock.onDelete('/project/1').reply(500)
    const { result } = renderHook(() => useDeleteProject(), { wrapper })

    await act(async () => {
      result.current.mutate('1')
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(false))
    await waitFor(() => expect(result.current.isError).toBe(true))
    await waitFor(() => expect(result.current.status).toBe('error'))
  })
})
