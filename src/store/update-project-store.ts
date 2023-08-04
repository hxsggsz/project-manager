import { create } from 'zustand'

interface EditProjectProps {
  projectId: string
  updateProjectId: (id: string) => void
}

export const useUpdateProjectStore = create<EditProjectProps>((set) => ({
  projectId: '',
  updateProjectId: (id: string) => set({ projectId: id }),
}))
