import { Plus } from '@phosphor-icons/react'
import { ModalAddProject } from '../modal-add-project'

export const Home = ({ userId }: { userId: string }) => {
  return (
    <div className="mt-24 w-full">
      <div className="flex w-full flex-col items-start pl-1 max-md:items-center">
        <h1 className="text-left text-2xl">Create a new project</h1>
        <ModalAddProject>
          <button className="ml-1 grid place-items-center rounded-md border-2 border-slate-400 p-2 shadow-lg">
            <Plus size={60} weight="bold" className="text-violet-main" />
            <p className="font-medium">New project</p>
          </button>
        </ModalAddProject>
      </div>
    </div>
  )
}
