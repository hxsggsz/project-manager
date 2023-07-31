import { X } from '@phosphor-icons/react'
import { Close } from '@radix-ui/react-dialog'

export const CloseModal = () => {
  return (
    <Close asChild>
      <button
        className="absolute right-[24px] top-[24px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full p-1 hover:bg-slate-600/30 hover:text-violet-main focus:shadow-[0_0_0_2px] focus:outline-none"
        aria-label="Close"
      >
        <X size={52} weight="bold" />
      </button>
    </Close>
  )
}
