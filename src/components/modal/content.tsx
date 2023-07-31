import { Overlay, Portal, Content } from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export const ContentModal = ({
  children,
  isOpen,
}: {
  children: ReactNode
  isOpen: boolean
}) => {
  return (
    <>
      <Overlay className="fixed inset-0 bg-slate-900/30" />
      <AnimatePresence>
        {isOpen && (
          <Portal forceMount>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                {children}
              </Content>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
}
