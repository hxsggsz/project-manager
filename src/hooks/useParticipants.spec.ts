import { cleanup, renderHook, waitFor } from '@testing-library/react'
import { useGetParticipants } from './useParticipants'
import { wrapper } from '../../__mocks__/hook-wrapper'
import { api } from '../lib/api'
import { MockFactory } from '../../__mocks__/mockFactory'
import { Participants } from './types/participants'
import { faker } from '@faker-js/faker'
import MockAdapter from 'axios-mock-adapter'

const mockParticipants = new MockFactory<Participants>(() => ({
  allParticipants: [
    {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      username: faker.person.lastName(),
      profilePhoto: faker.image.url(),
      createdAt: faker.date.anytime(),
    },
  ],
}))
const mock = new MockAdapter(api)

beforeAll(() => {
  mock.reset()
})

afterEach(cleanup)

describe('useGetParticipants', () => {
  it('should get the participants', async () => {
    const participants = mockParticipants.getMock()
    mock.onGet('/participant/1').reply(200, participants)

    const { result } = renderHook(() => useGetParticipants('1'), {
      wrapper,
    })
    await waitFor(() =>
      expect(result.current.data?.allParticipants[0].name).toBe(
        participants.allParticipants[0].name,
      ),
    )
  })
})
