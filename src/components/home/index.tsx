import { Plus } from '@phosphor-icons/react'
import { ModalAddProject } from '../modal-add-project'
import { Project } from '@/utils/types/dashboard'
import useSizeScreen from '@/hooks/useSizeScreen'

interface HomeProps {
  projects: Project[]
}

export const Home = ({ projects }: HomeProps) => {
  const { width } = useSizeScreen()

  function formatDate(date: Date) {
    const formatedDate = new Intl.DateTimeFormat('en-US', {
      year: width > 465 ? 'numeric' : '2-digit',
      day: '2-digit',
      month: width > 465 ? 'long' : 'short',
      hour: width > 465 ? 'numeric' : '2-digit',
    })

    return formatedDate.format(new Date(date))
  }

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
        <div className="overflow-hidden overflow-y-auto rounded-md border-2 border-slate-300 shadow-md">
          <table className="w-full table-auto px-4">
            <thead className="border-collapse bg-violet-main">
              <tr className="text-lg text-white">
                <th className="py-4 pl-4 text-left">Project Name</th>
                <th className="whitespace-nowrap py-4 text-left">Created At</th>
                <th className="whitespace-nowrap py-4 pr-4 text-right">
                  Is Public?
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr key={proj._id}>
                  <td className="whitespace-nowrap border-b border-slate-300 py-3 pl-4 font-semibold">
                    {proj.props.name}
                  </td>
                  <td className="whitespace-nowrap border-b border-slate-300 py-3 font-semibold">
                    {formatDate(proj.props.createdAt)}
                  </td>
                  <td className=" whitespace-nowrap border-b border-slate-300 py-3 pr-4 text-right font-semibold">
                    {proj.props.isPublic ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
