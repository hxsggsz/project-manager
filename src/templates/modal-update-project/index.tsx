import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { useForm } from 'react-hook-form'
import jwtDecode from 'jwt-decode'
import { User } from '../../utils/types/dashboard'
import { Modal } from '../../components/modal'
import { Switch } from '../../components/switch'
import { PopUp } from '../../components/popup'
import { Input } from '../../components/input'
import { Button } from '../../components/button'
import { useUpdateProject } from '../../services/hooks/useProject'
import { useProjectIdStore } from '../../stores/project-id-store'
import {
  CreateProjectProps,
  CreateProjectSchema,
} from '../../utils/validations/create-project'

export const ModalUpdateProject = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>> | (() => void)
}) => {
  const token = getCookie('token')
  const [isPublic, setIsPublic] = useState(false)
  const { mutate, isLoading, isSuccess } = useUpdateProject()

  const projectId = useProjectIdStore((state) => state.projectId)

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
  const user = useMemo(() => {
    if (!token) {
      return
    }
    const userDecode: User = jwtDecode(token.toString())
    return userDecode
  }, [token])

  function onSubmit({ name }: CreateProjectProps) {
    if (!user) {
      return
    }

    const body = {
      name,
      projectId,
      isPublic,
    }
    mutate(body)
  }

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false)
      reset({
        name: '',
      })
    }
  }, [isSuccess, reset, setIsOpen])

  return (
    <Modal.Root isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Content isOpen={isOpen}>
        <Modal.Title title="Update project" />
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
              Update
            </Button>
          </div>
        </form>
        <Modal.Close />
      </Modal.Content>
    </Modal.Root>
  )
}
