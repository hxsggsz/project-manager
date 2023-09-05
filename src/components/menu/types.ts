export interface MenuProps {
  children: React.ReactNode
  isOpen?: boolean
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  items: MenuItem[]
}

export interface MenuItem {
  name: string
  onSelect: () => void
  logout?: boolean
}
