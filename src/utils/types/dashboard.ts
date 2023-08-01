/* eslint-disable no-use-before-define */
export interface DashboardProps {
  user: User
  projects: Project[]
}

export interface User {
  sub: string
  name: string
  username: string
  profile_photo: string
}

export interface Project {
  _id: string
  props: {
    createdAt: Date
    isPublic: boolean
    name: string
    ownerId: string
  }
}
