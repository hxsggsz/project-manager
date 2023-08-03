import { ReactNode, useState } from 'react'
import { Modal } from '../modal'

export const ModalConfirmDeleteProject = ({
  children,
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPublic, setIsPublic] = useState(false)

  return (
    <Modal.Root isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Trigger>{children}</Modal.Trigger>

      <Modal.Content isOpen={isOpen}>
        <Modal.Title title="Are you sure?" />
        <h1>You really want to delete this project?</h1>
        <div>
          <button>no</button>
          <button>yes</button>
        </div>
        <Modal.Close />
      </Modal.Content>
    </Modal.Root>
  )
}
