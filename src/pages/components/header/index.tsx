import Image from 'next/image'
import { CaretDown, CaretUp, X } from '@phosphor-icons/react'
import * as Popover from '@radix-ui/react-popover'
import { useState } from 'react'
import { motion } from 'framer-motion'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="fixed left-0 top-0 flex w-screen justify-end border-[1px] border-slate-300 py-3 pr-4">
      <Popover.Root onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <div className="flex cursor-pointer items-center gap-2">
            <Image
              width={50}
              height={50}
              src={`/defaultUser.png`}
              alt={`profile picture of`}
              className="pointer-events-none select-none rounded-full"
            />
            <motion.span whileTap={{ rotate: 360 }}>
              {isOpen ? (
                <CaretUp size={20} weight="bold" />
              ) : (
                <CaretDown size={20} weight="bold" />
              )}
            </motion.span>
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="rounded border-[1px] border-slate-300 bg-white p-5"
            sideOffset={5}
          >
            <p>wda</p>
            <Popover.Close
              className="absolute right-[5px] top-[5px] inline-flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full outline-none"
              // aria-label="Close"
            >
              <X size={20} weight="bold" />
            </Popover.Close>
            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </header>
  )
}
