export interface Participants {
  allParticipants: AllParticipant[]
}

export interface AllParticipant {
  id: string
  name: string
  username: string
  profilePhoto: string
  createdAt: Date
}
