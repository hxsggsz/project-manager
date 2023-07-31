import React, { ReactNode } from 'react'

export const Root = ({ children }: { children: ReactNode }) => {
  return (
    <label className=" flex h-11 w-full cursor-text gap-1 rounded-md border-4 border-slate-300 bg-slate-300 focus:border-slate-900 focus:bg-slate-50">
      {children}
    </label>
  )
}
