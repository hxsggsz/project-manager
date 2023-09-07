import { ReactNode, useMemo, useState } from 'react'
import { Modal } from '../modal'
import * as Switch from '@radix-ui/react-switch'
import { Button } from '../button'
import {
  CreateProjectProps,
  CreateProjectSchema,
} from '../../utils/validations/create-project'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { useForm } from 'react-hook-form'
import { Input } from '../input'
import jwtDecode from 'jwt-decode'
import { User } from '../../utils/types/dashboard'
import { useCreateProject } from '../../hooks/useProject'
import { PopUp } from '../popup'

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

  const { mutate, isError, isLoading } = useCreateProject(user?.sub)

  const {
    watch,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectProps>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: { name: '' },
  })

  function onSubmit({ name }: CreateProjectProps) {
    if (!user) {
      return
    }

    const body = {
      name,
      isPublic,
      userId: user.sub,
    }
    mutate(body)

    if (!isError) {
      setIsOpen(false)
      reset({
        name: '',
      })
    }
  }

  return (
    <Modal.Root data-testid="add-project" isOpen={isOpen} setIsOpen={setIsOpen}>
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
              className="relative h-[25px] w-[42px] cursor-pointer rounded-full border border-slate-300 shadow-md outline-none data-[state=checked]:bg-violet-main focus:shadow-[0_0_0_2px] focus:shadow-black"
              id="airplane-mode"
            >
              <Switch.Thumb className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-violet-main shadow-md transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px] data-[state=checked]:bg-white" />
            </Switch.Root>
            <PopUp
              content="This mean that everyone with the link of this project can
                    access it and it tasks but cannot make any new tasks and
                    chat"
            >
              <p className="text-violet-main underline">
                This project is public?
              </p>
            </PopUp>
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
              isLoading={isLoading}
              disabled={watch('name') === '' || isLoading}
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
