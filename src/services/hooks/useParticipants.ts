import { getCookie } from 'cookies-next'
import { useQuery } from 'react-query'
import { Participants } from './types/participants'
import { api } from '../../lib/api'

const token = getCookie('token')

export const useGetParticipants = (projectId: string) => {
  const projects = useQuery('participants', async () => {
    if (projectId !== '') {
      const response = await api.get<Participants>(
        `/participant/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      return response.data
    }
  })
  return projects
}
