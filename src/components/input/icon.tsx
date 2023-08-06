import { ElementType } from 'react'

interface InputIconProps {
  icon: ElementType
}

export const Icon = ({ icon: Icon }: InputIconProps) => {
  return <Icon size={38} data-testid="icon" className="text-slate-600" />
}
