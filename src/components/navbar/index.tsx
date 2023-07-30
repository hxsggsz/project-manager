import { ChatTeardropText, House, Kanban } from '@phosphor-icons/react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const variantsMenu = {
  open: { width: '25%' },
  closed: { width: '68px' },
}

const variantsList = {
  focus: {
    scale: 1.05,
  },
  notFocus: {
    scale: 1,
  },
}

export const Navbar = ({ isOpen }: { isOpen: boolean }) => {
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
      className="h-screen w-1/4 overflow-hidden border-r border-slate-300"
    >
      <header className="flex items-center justify-center gap-2 border-b border-slate-300 py-7 max-[570px]:py-[30px]">
        <Image
          width={24}
          height={24}
          src="/logo.png"
          className="h-full"
          alt="logo of the project"
        />
        {isOpen && <h1 className="truncate text-xl">Project Manager</h1>}
      </header>

      <ul className="grid gap-6 p-6">
        <motion.li
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, scale: hash === 'home' ? 1.05 : 1 }}
          variants={variantsList}
        >
          <Link className="flex gap-3" href="/dashboard#home">
            <House size={24} weight={hash === 'home' ? 'fill' : 'thin'} />
            {isOpen && <p className="text-base">Home</p>}
          </Link>
        </motion.li>
        <motion.li
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, scale: hash === 'message' ? 1.05 : 1 }}
          variants={variantsList}
        >
          <Link className="flex gap-3" href="/dashboard#message">
            <ChatTeardropText
              size={24}
              weight={hash === 'message' ? 'fill' : 'thin'}
            />
            {isOpen && <p className="text-base">Messages</p>}
          </Link>
        </motion.li>
        <motion.li
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, scale: hash === 'tasks' ? 1.05 : 1 }}
          variants={variantsList}
        >
          <Link className="flex gap-3" href="/dashboard#tasks">
            <Kanban size={24} weight={hash === 'tasks' ? 'fill' : 'thin'} />
            {isOpen && <p className="text-base">Tasks</p>}
          </Link>
        </motion.li>
      </ul>
    </motion.nav>
  )
}
