import { Trigger } from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

export const TriggerModal = ({ children }: { children: ReactNode }) => {
  return <Trigger asChild>{children}</Trigger>
}
