import { DotsThree } from '@phosphor-icons/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ModalUpdateProject } from '../modal-update-project'

interface ProjectListProps {
  id: string
  item: string
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}

export const ProjectList = ({
  id,
  item,
  handleEdit,
  handleDelete,
}: ProjectListProps) => {
  const [isHover, setIsHover] = useState(false)
  const [projectMenuOpen, setProjectMenuOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-slate-600/20"
    >
      <p className="text-base font-medium text-slate-600 hover:font-semibold hover:text-slate-900">
        {item}
      </p>
      <DropdownMenu.Root onOpenChange={setProjectMenuOpen}>
        <DropdownMenu.Trigger>
          {isHover && (
            <DotsThree size={19} weight="bold" className="text-black" />
          )}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <AnimatePresence>
            {projectMenuOpen && (
              <DropdownMenu.Content
                forceMount
                className="mr-6 min-w-[220px] rounded-md bg-slate-100 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
                sideOffset={10}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <DropdownMenu.Item
                    onSelect={() => setIsOpen(true)}
                    className="flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none hover:bg-violet-main hover:text-white"
                  >
                    Edit project
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    onSelect={() => handleDelete(id)}
                    className="flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-red-400 outline-none data-[disabled]:pointer-events-none hover:bg-violet-main"
                  >
                    Delete project
                  </DropdownMenu.Item>

                  <DropdownMenu.Arrow className="fill-white" />
                </motion.div>
              </DropdownMenu.Content>
            )}
          </AnimatePresence>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <ModalUpdateProject isOpen={isOpen} setIsOpen={setIsOpen} />
    </motion.div>
  )
}
