import {
  ArrowLineLeft,
  ArrowLineRight,
  ChatTeardropText,
  ClipboardText,
  House,
  Kanban,
  Plus,
  Users,
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { ModalAddProject } from '../modal-add-project'
import { ProjectList } from '../../components/project-list'
import { Project } from '../../utils/types/dashboard'
import { Spinner } from '../../components/spinner'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDeleteProject } from '../../services/hooks/useProject'

interface NavBarProps {
  isOpen: boolean
  handleOpen: () => void
  projects: Project[] | undefined
}

const variantsMenu = {
  open: { minWidth: '220px' },
  closed: {
    maxWidth: '80px',
    minWidth: '80px',
  },
}

export const Navbar = (props: NavBarProps) => {
  const { asPath } = useRouter()
  const [hash, setHash] = useState('')
  const { mutate } = useDeleteProject()

  useEffect(() => {
    const hash = asPath && asPath.split('#')[1]
    setHash(hash)
  }, [asPath])

  function handleDelete(id: string) {
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(
        'you really want to delete this project?',
      )

      if (confirmed) {
        mutate(id)
      }
    }
  }

  return (
    <motion.nav
      layout
      animate={props.isOpen ? 'open' : 'closed'}
      variants={variantsMenu}
      data-open={props.isOpen}
      className="relative mt-[84px] w-20 overflow-x-hidden border-r border-slate-300 scrollbar scrollbar-track-inherit scrollbar-thumb-violet-main scrollbar-thumb-rounded-lg scrollbar-w-2 data-[open=true]:max-sm:min-w-[80%]"
    >
      <motion.ul
        layout
        data-open={props.isOpen}
        className="grid gap-2 px-3 py-7 data-[open=false]:place-items-center"
      >
        <motion.li
          data-open={props.isOpen}
          onClick={props.handleOpen}
          data-testid="buttonOpenNav"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, scale: hash === '#home' ? 1.05 : 1 }}
          className="flex cursor-pointer gap-3 rounded-lg p-2 data-[open=false]:rounded-full hover:bg-slate-600/20"
        >
          {props.isOpen ? (
            <ArrowLineLeft size={24} />
          ) : (
            <ArrowLineRight size={24} />
          )}
          {props.isOpen && <p className="text-base">Collapse</p>}
        </motion.li>
        <Link href="/dashboard">
          <motion.li
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: !hash ? 1.05 : 1,
            }}
            data-open={props.isOpen}
            className="flex gap-3 rounded-lg p-2 data-[open=false]:rounded-full hover:bg-slate-600/20"
          >
            <House
              size={24}
              data-select={!hash}
              weight={!hash ? 'fill' : 'thin'}
              className="data-[select=true]:text-violet-main"
            />
            {props.isOpen && <p className="text-base">Home</p>}
          </motion.li>
        </Link>

        <Link href="/dashboard#message">
          <motion.li
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: hash === 'message' ? 1.05 : 1,
            }}
            data-open={props.isOpen}
            className="flex gap-3 rounded-lg p-2 data-[open=false]:rounded-full hover:bg-slate-600/20"
          >
            <ChatTeardropText
              size={24}
              data-select={hash === 'message'}
              weight={hash === 'message' ? 'fill' : 'thin'}
              className="data-[select=true]:text-violet-main"
            />
            {props.isOpen && <p className="text-base">Messages</p>}
          </motion.li>
        </Link>

        <Link href="/dashboard#tasks">
          <motion.li
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: hash === 'tasks' ? 1.05 : 1,
            }}
            data-open={props.isOpen}
            className="flex gap-3 rounded-lg p-2 data-[open=false]:rounded-full hover:bg-slate-600/20"
          >
            <Kanban
              size={24}
              data-select={hash === 'tasks'}
              weight={hash === 'tasks' ? 'fill' : 'thin'}
              className="data-[select=true]:text-violet-main"
            />
            {props.isOpen && <p className="text-base">Tasks</p>}
          </motion.li>
        </Link>

        <Link href="/dashboard#members">
          <motion.li
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: hash === 'members' ? 1.05 : 1,
            }}
            data-open={props.isOpen}
            className="flex gap-3 rounded-lg p-2 data-[open=false]:rounded-full hover:bg-slate-600/20"
          >
            <Users
              size={24}
              data-select={hash === 'members'}
              weight={hash === 'members' ? 'fill' : 'thin'}
              className="data-[select=true]:text-violet-main"
            />
            {props.isOpen && <p className="text-base">Members</p>}
          </motion.li>
        </Link>
      </motion.ul>

      <article
        data-open={props.isOpen}
        className="grid gap-2 overflow-y-auto border-t border-slate-300 pb-5 pt-7 data-[open=false]:place-items-center data-[open=true]:px-3"
      >
        {props.isOpen ? (
          <>
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
              <AnimatePresence>
                {!props.projects ? (
                  <div className="grid h-28 w-full place-items-center">
                    <Spinner size={38} color="000" />
                  </div>
                ) : props.projects.length < 1 ? (
                  <p>No projects yet</p>
                ) : (
                  props.projects.map((proj) => (
                    <motion.li
                      layout
                      key={proj.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: 'backInOut' }}
                    >
                      <ProjectList
                        id={proj.id}
                        item={proj.name}
                        handleDelete={() => handleDelete(proj.id)}
                      />
                    </motion.li>
                  ))
                )}
              </AnimatePresence>
            </ul>
          </>
        ) : (
          <ClipboardText size={24} weight="thin" />
        )}
      </article>
    </motion.nav>
  )
}
