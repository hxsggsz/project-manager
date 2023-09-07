import { ReactNode, useMemo, useState } from 'react'
import {
  CreateProjectProps,
  CreateProjectSchema,
} from '../../utils/validations/create-project'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { useForm } from 'react-hook-form'
import jwtDecode from 'jwt-decode'
import { User } from '../../utils/types/dashboard'
import { useCreateProject } from '../../services/hooks/useProject'
import { Modal } from '../../components/modal'
import { Switch } from '../../components/switch'
import { PopUp } from '../../components/popup'
import { Input } from '../../components/input'
import { Button } from '../../components/button'

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
            <Switch isChecked={isPublic} setIsChecked={setIsPublic} />
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
