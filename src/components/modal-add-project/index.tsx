import { ReactNode, useMemo, useState } from 'react'
import { Modal } from '../modal'
import * as HoverCard from '@radix-ui/react-hover-card'
import * as Switch from '@radix-ui/react-switch'
import { Button } from '../button'
import {
  CreateProjectProps,
  CreateProjectSchema,
} from '@/utils/validations/create-project'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { useForm } from 'react-hook-form'
import { Input } from '../input'
import jwtDecode from 'jwt-decode'
import { User } from '@/utils/types/dashboard'
import { api } from '@/lib/api'
import { useMutation, useQueryClient } from 'react-query'

interface NewProjectProps {
  name: string
  isPublic: boolean
}

export const ModalAddProject = ({ children }: { children: ReactNode }) => {
  const token = getCookie('token')
  const [isOpen, setIsOpen] = useState(false)
  const [isPublic, setIsPublic] = useState(false)

  const user = useMemo(() => {
    if (!token) {
      return
    }

    const userDecode: User = jwtDecode(token.toString())
    return userDecode
  }, [token])

  const query = useQueryClient()
  const mutate = useMutation({
    mutationFn: (data: NewProjectProps) => {
      return api.post(`/project/${user?.sub}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      query.invalidateQueries(['personal info'])
    },
  })

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectProps>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: { name: '' },
  })

  function onSubmit({ name }: CreateProjectProps) {
    mutate.mutate({ name, isPublic })
  }

  return (
    <Modal.Root isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Trigger>{children}</Modal.Trigger>

      <Modal.Content isOpen={isOpen}>
        <Modal.Title title="Create new project" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-start gap-2"
        >
          <label className="flex w-full gap-2 font-semibold">
            <Switch.Root
              defaultChecked={isPublic}
              onCheckedChange={setIsPublic}
              className="relative h-[25px] w-[42px] cursor-pointer rounded-full border border-slate-300 shadow-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-violet-main"
              id="airplane-mode"
            >
              <Switch.Thumb className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-violet-main shadow-md transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px] data-[state=checked]:bg-white" />
            </Switch.Root>
            <HoverCard.Root>
              <HoverCard.Trigger className="text-violet-main underline">
                This project is public?
              </HoverCard.Trigger>

              <HoverCard.Portal>
                <HoverCard.Content
                  className="w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                  sideOffset={5}
                >
                  <p className="text-base font-semibold">
                    This mean that everyone with the link of this project can
                    access it and it tasks but cannot make any new tasks and
                    chat
                  </p>
                  <HoverCard.Arrow className="fill-white" />
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
          </label>

          <Input.Root>
            <Input.Input
              {...register('name')}
              placeholder="Best project name"
            />
          </Input.Root>

          {errors.name && (
            <span className="pl-2 text-red-500">{errors.name.message}</span>
          )}

          <div className="flex w-full justify-end">
            <Button
              type="submit"
              isLoading={mutate.isLoading}
              disabled={watch('name') === '' || mutate.isLoading}
            >
              Create
            </Button>
          </div>
        </form>
        <Modal.Close />
      </Modal.Content>
    </Modal.Root>
  )
}
