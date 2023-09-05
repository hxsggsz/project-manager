import Image from 'next/image'
import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { User } from '../../utils/types/dashboard'
import { MenuItem } from '../menu/types'
import { Menu } from '../menu'
import { motion } from 'framer-motion'

interface headerProps {
  user: User
  navbarOpen: boolean
}

const variantsMenu = {
  open: { minWidth: '220px' },
  closed: {
    maxWidth: '80px',
    minWidth: '80px',
  },
}

const menuItems = [
  { name: 'My profile', onSelect: () => {} },
  { name: 'Exit', onSelect: () => {}, logout: true },
] satisfies MenuItem[]

export const Header = ({ user, navbarOpen }: headerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="fixed right-0 top-0 flex w-screen justify-between border-b-[1px] border-slate-300 pr-[22px] backdrop-blur-sm">
      <motion.section
        animate={navbarOpen ? 'open' : 'closed'}
        variants={variantsMenu}
        data-open={navbarOpen}
        className="sticky left-0 top-0 z-30 flex h-full w-20 cursor-pointer select-none items-center gap-4 border-r border-slate-300 px-3 py-[30px] backdrop-blur-sm data-[open=false]:justify-center"
      >
        <Image
          width={24}
          height={24}
          src="/logo.png"
          className="h-full"
          alt="logo of the project"
        />
        {navbarOpen && <h1 className="truncate text-xl">Project M.</h1>}
      </motion.section>

      <Menu items={menuItems} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div
          data-testid="headerMenu"
          data-open={navbarOpen}
          className="flex cursor-pointer items-center gap-2  data-[open=true]:max-sm:hidden"
        >
          <section>
            <h1 className="text-base font-normal">{user.name}</h1>
            <p className=" text-right text-sm text-slate-500">
              {user.username}
            </p>
          </section>
          <Image
            width={38}
            height={38}
            src={user.profile_photo}
            alt={`profile of ${user.name}`}
            className="pointer-events-none select-none rounded-full"
          />
          <motion.span animate={{ rotate: isOpen ? 100 : 0 }}>
            <CaretDown data-testid="down" size={20} weight="thin" />
          </motion.span>
        </div>
      </Menu>
    </header>
  )
}
