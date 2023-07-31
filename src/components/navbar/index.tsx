import {
  CaretDoubleLeft,
  CaretDoubleRight,
  ChatTeardropText,
  House,
  Kanban,
  Plus,
  Users,
} from '@phosphor-icons/react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ModalAddProject } from '../modal-add-project'

const variantsMenu = {
  open: { width: '250px' },
  closed: { width: '68px' },
}

export const Navbar = ({
  isOpen,
  handleOpen,
}: {
  isOpen: boolean
  handleOpen: () => void
}) => {
  const { asPath } = useRouter()
  const [hash, setHash] = useState('')

  useEffect(() => {
    setHash(asPath.split('#')[1])
  }, [asPath])

  return (
    <motion.nav
      layout
      animate={isOpen ? 'open' : 'closed'}
      variants={variantsMenu}
      onClick={handleOpen}
      className="relative w-1/4 cursor-pointer overflow-hidden border-r border-slate-300"
    >
      <header
        data-open={isOpen}
        className="flex items-center justify-center gap-2 border-b border-slate-300 px-4 py-[30px] data-[open=true]:py-7"
      >
        <Image
          width={24}
          height={24}
          src="/logo.png"
          className="h-full"
          alt="logo of the project"
        />
        {isOpen && <h1 className="truncate text-xl">Project Manager</h1>}
      </header>

      <ul className="grid gap-2 py-7 max-md:place-items-center">
        <Link
          className=""
          href="/dashboard#home"
          onClick={(ev) => ev.stopPropagation()}
        >
          <motion.li
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1, scale: hash === 'home' ? 1.05 : 1 }}
            className="flex gap-3 rounded-lg px-4 py-2 hover:bg-slate-600/20 max-[570px]:rounded-full max-[570px]:p-2"
          >
            <House size={24} weight={hash === 'home' ? 'fill' : 'thin'} />
            {isOpen && <p className="text-base">Home</p>}
          </motion.li>
        </Link>

        <Link
          onClick={(ev) => ev.stopPropagation()}
          className=""
          href="/dashboard#message"
        >
          <motion.li
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1, scale: hash === 'message' ? 1.05 : 1 }}
            className="flex gap-3 rounded-lg px-4 py-2 hover:bg-slate-600/20 max-[570px]:rounded-full max-[570px]:p-2"
          >
            <ChatTeardropText
              size={24}
              weight={hash === 'message' ? 'fill' : 'thin'}
            />
            {isOpen && <p className="text-base">Messages</p>}
          </motion.li>
        </Link>

        <Link
          onClick={(ev) => ev.stopPropagation()}
          className=""
          href="/dashboard#tasks"
        >
          <motion.li
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1, scale: hash === 'tasks' ? 1.05 : 1 }}
            className="flex gap-3 rounded-lg px-4 py-2 hover:bg-slate-600/20 max-[570px]:rounded-full max-[570px]:p-2"
          >
            <Kanban size={24} weight={hash === 'tasks' ? 'fill' : 'thin'} />
            {isOpen && <p className="text-base">Tasks</p>}
          </motion.li>
        </Link>

        <Link
          onClick={(ev) => ev.stopPropagation()}
          className="rounded-lg px-4 py-2 hover:bg-slate-600/20 max-[570px]:rounded-full max-[570px]:p-0"
          href="/dashboard#members"
        >
          <motion.li
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1, scale: hash === 'members' ? 1.05 : 1 }}
            className="flex gap-3"
          >
            <Users size={24} weight={hash === 'members' ? 'fill' : 'thin'} />
            {isOpen && <p className="text-base">Members</p>}
          </motion.li>
        </Link>
      </ul>

      <article
        onClick={(ev) => ev.stopPropagation()}
        className="border-t border-slate-300 px-4 py-7"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold">MY PROJECTS</p>
          <ModalAddProject>
            <Plus
              size={16}
              weight="light"
              className="rounded-md border border-slate-400 text-slate-600"
            />
          </ModalAddProject>
        </div>
        <ul>
          <li>test</li>
        </ul>
      </article>

      <div className="absolute bottom-0 right-0 px-4 py-7 max-[570px]:py-[30px]">
        {isOpen ? (
          <CaretDoubleRight size={24} weight="thin" />
        ) : (
          <CaretDoubleLeft size={24} weight="thin" />
        )}
      </div>
    </motion.nav>
  )
}
