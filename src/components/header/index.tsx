import Image from 'next/image'
import { useState } from 'react'
import { CaretDown, CaretUp } from '@phosphor-icons/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { UserProps } from '@/utils/types/dashboard'

export const Header = ({ user }: UserProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="fixed left-0 top-0 flex w-screen justify-end border-[1px] border-slate-300 py-3 pr-4">
      <DropdownMenu.Root onOpenChange={setIsOpen}>
        <DropdownMenu.Trigger asChild>
          <div className="flex cursor-pointer items-center gap-2">
            <section>
              <h1 className="text-base font-normal">{user.name}</h1>
              <p className=" text-right text-sm text-slate-400">
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
                <CaretUp size={20} weight="bold" />
              ) : (
                <CaretDown size={20} weight="bold" />
              )}
            </span>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className=" mr-6 min-w-[220px] rounded-md bg-slate-100 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
            sideOffset={10}
          >
            <DropdownMenu.Item className="relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none hover:bg-violet-main hover:text-white">
              My Profile
            </DropdownMenu.Item>

            <DropdownMenu.Item className="relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none hover:bg-violet-main hover:text-white data-[disabled]:pointer-events-none">
              Exit
            </DropdownMenu.Item>

            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </header>
  )
}
