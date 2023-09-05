import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { MenuProps } from './types'

export const Menu = (props: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const renderMenuItems = () =>
    props.items.map((item, index) => (
      <DropdownMenu.Item
        key={index}
        onSelect={item.onSelect}
        data-logout={item.logout}
        className="relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none hover:bg-violet-main hover:text-violet-100 hover:data-[logout=true]:text-red-400"
      >
        {item.name}
      </DropdownMenu.Item>
    ))

  const renderMenuContent = () => (
    <DropdownMenu.Content
      forceMount
      className="mr-6 min-w-[220px] rounded-md bg-slate-100 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
      sideOffset={10}
    >
      <motion.div
        data-testid="menu"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        {renderMenuItems()}
        <DropdownMenu.Arrow className="fill-white" />
      </motion.div>
    </DropdownMenu.Content>
  )

  return (
    <DropdownMenu.Root onOpenChange={props.setIsOpen ?? setIsOpen}>
      <DropdownMenu.Trigger asChild>{props.children}</DropdownMenu.Trigger>

      <AnimatePresence>
        <DropdownMenu.Portal>
          {isOpen || (props.isOpen && renderMenuContent())}
        </DropdownMenu.Portal>
      </AnimatePresence>
    </DropdownMenu.Root>
  )
}
