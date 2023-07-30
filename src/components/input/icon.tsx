import { ElementType } from 'react'

interface InputIconProps {
  icon: ElementType
}

export const Icon = ({ icon: Icon }: InputIconProps) => {
  return <Icon size={38} data-cy="user" />
}
