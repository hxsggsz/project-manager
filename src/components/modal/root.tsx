import { Root } from '@radix-ui/react-dialog'
import { Dispatch, ReactNode, SetStateAction } from 'react'

interface RootModalProps {
  children: ReactNode
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const RootModal = ({ children, isOpen, setIsOpen }: RootModalProps) => {
  return (
    <Root open={isOpen} onOpenChange={setIsOpen}>
      {children}
    </Root>
  )
}
