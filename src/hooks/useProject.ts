import { api } from '@/lib/api'
import { Projects } from '@/utils/types/dashboard'
import { getCookie } from 'cookies-next'
import { useMutation, useQuery, useQueryClient } from 'react-query'

interface NewProjectProps {
  name: string
  isPublic: boolean
  participantName: string
  participantPhoto: string
  participantUsername: string
}

const token = getCookie('token')
export const useGetProjects = (userId: string) => {
  const projects = useQuery<Projects>('projects', async () => {
    const response = await api.get(`/project/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  })

  return projects
}

export const useCreateProject = (userId: string | undefined) => {
  const query = useQueryClient()
  const mutate = useMutation({
    mutationFn: (data: NewProjectProps) => {
      return api.post(`/project/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      query.invalidateQueries(['projects'])
    },
  })
  return mutate
}

export const useDeleteProject = () => {
  const query = useQueryClient()
  const deleteProject = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      query.invalidateQueries(['projects'])
    },
  })

  return deleteProject
}
