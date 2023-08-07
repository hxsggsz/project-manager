import { ParticipantsList } from '.'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { api } from '../../lib/api'
import MockAdapter from 'axios-mock-adapter'
import { Participants } from '../../hooks/types/participants'
import { faker } from '@faker-js/faker'

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const projectId = '123'
const mock = new MockAdapter(api)
const data: Participants = {
  allParticipants: [
    {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      username: faker.person.lastName(),
      profilePhoto: faker.image.url(),
      createdAt: faker.date.anytime(),
    },
  ],
}
mock.onGet(`/participant/${projectId}`).reply(200, data)

const participantsList = () => {
  render(<ParticipantsList id={projectId}>open</ParticipantsList>)
}

describe('<ParticipantsList/>', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should not render the modal if is close', () => {
    participantsList()

    expect(screen.queryByTestId('participantsList')).not.toBeInTheDocument()
  })

  it('should render the modal if is open', async () => {
    window.ResizeObserver = ResizeObserver
    participantsList()
    const button = screen.getByText(/open/i)

    expect(button).toBeInTheDocument()

    await act(() => userEvent.hover(button))

    await waitFor(() =>
      expect(
        screen.getByText(data.allParticipants[0].name),
      ).toBeInTheDocument(),
    )
  })
})
