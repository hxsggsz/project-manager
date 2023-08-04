/* eslint-disable no-use-before-define */
export interface DashboardProps {
  user: User
}

export interface User {
  sub: string
  name: string
  username: string
  profile_photo: string
}

export interface Projects {
  projects: Project[]
}

export interface Project {
  id: string
  name: string
  userId: string
  isPublic: boolean
  createdAt: Date
  _count: Count
}

export interface Count {
  participants: number
}
