import Image from 'next/image'
import { useState } from 'react'
import { CaretDown, CaretUp, List } from '@phosphor-icons/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { User } from '@/utils/types/dashboard'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

interface headerProps {
  user: User
  navbarOpen: boolean
  handleNavBar: () => void
}

export const Header = ({ user, navbarOpen, handleNavBar }: headerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header
      data-open={navbarOpen}
      className="fixed right-0 top-0 flex w-screen justify-between border-b-[1px] border-slate-300 px-7 backdrop-blur-sm"
    >
      <section
        data-open={navbarOpen}
        className="sticky left-0 top-0 z-30 flex h-full select-none items-center justify-center gap-4 py-[30px] backdrop-blur-sm data-[open=true]:py-7"
      >
        <List
          onClick={handleNavBar}
          size={39}
          className="cursor-pointer rounded-full p-2 transition-all hover:bg-slate-600/30 active:bg-slate-600/20"
          weight="thin"
        />
        <Image
          width={24}
          height={24}
          src="/logo.png"
          className="h-full"
          alt="logo of the project"
        />
        <h1 className="truncate text-xl">Project Manager</h1>
      </section>

      <DropdownMenu.Root onOpenChange={setIsOpen}>
        <DropdownMenu.Trigger asChild>
          <div className="flex cursor-pointer items-center gap-2">
            <section>
              <h1 className="text-base font-normal">{user.name}</h1>
              <p className=" text-right text-sm text-slate-500">
                {user.username}
              </p>
            </section>
            <Image
              width={38}
              height={38}
              src={
                user.profile_photo === ''
                  ? '/defaultUser.png'
                  : user.profile_photo
              }
              alt={`profile picture of ${user.name}`}
              className="pointer-events-none select-none rounded-full"
            />
            <span>
              {isOpen ? (
                <CaretUp size={20} weight="thin" />
              ) : (
                <CaretDown size={20} weight="thin" />
              )}
            </span>
          </div>
        </DropdownMenu.Trigger>
        <AnimatePresence>
          <DropdownMenu.Portal>
            {isOpen && (
              <DropdownMenu.Content
                forceMount
                className=" mr-6 min-w-[220px] rounded-md bg-slate-100 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
                sideOffset={10}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <DropdownMenu.Item className="relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none hover:bg-violet-main hover:text-white">
                    My Profile
                  </DropdownMenu.Item>

                  <Link href="/api/auth/logout">
                    <DropdownMenu.Item className="relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none hover:bg-violet-main hover:text-red-400 data-[disabled]:pointer-events-none">
                      Exit
                    </DropdownMenu.Item>
                  </Link>

                  <DropdownMenu.Arrow className="fill-white" />
                </motion.div>
              </DropdownMenu.Content>
            )}
          </DropdownMenu.Portal>
        </AnimatePresence>
      </DropdownMenu.Root>
    </header>
  )
}
