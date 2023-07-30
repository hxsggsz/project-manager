/* eslint-disable no-use-before-define */
export interface UserProps {
  user: Token
}

export interface Token {
  sub: string
  name: string
  username: string
  profile_photo: string
}
