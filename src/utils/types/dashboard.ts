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
  _id: string
  props: Props
}

export interface Props {
  name: string
  isPublic: boolean
  ownerId: string
  createdAt: Date
}
