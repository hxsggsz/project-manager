import { Plus } from '@phosphor-icons/react'
import { ModalAddProject } from '../modal-add-project'
import { Project } from '../../utils/types/dashboard'
import { Table } from '../table'

interface HomeProps {
  projects: Project[] | undefined
}

export const Home = ({ projects }: HomeProps) => {
  return (
    <div className="w-full">
      <div className="mt-24 w-full">
        <div className="flex w-full flex-col items-start pl-2 max-md:items-center">
          <h1 className="pb-2 text-left text-2xl">Create a new project</h1>
          <ModalAddProject>
            <button className="ml-1 grid place-items-center rounded-md border-b-2 border-r-2 border-violet-main p-2 shadow-lg transition-all hover:border-b-4 hover:border-r-4 active:border-b active:border-r">
              <Plus size={60} weight="bold" className="text-violet-main" />
              <p className="font-medium">New project</p>
            </button>
          </ModalAddProject>
        </div>
      </div>

      <div className="mt-10 px-12 pl-2 max-sm:px-2">
        <h1 className="text-2xl max-sm:text-center">Select one project</h1>
        <Table projects={projects} />
      </div>
    </div>
  )
}
