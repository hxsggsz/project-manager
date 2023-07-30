import { Lock, LockOpen } from '@phosphor-icons/react'

interface PasswordProps {
  IsShowPassword: boolean
  handleShowPassword: () => void
}

export const Password = ({
  IsShowPassword,
  handleShowPassword,
}: PasswordProps) => {
  return (
    <>
      <button
        type="button"
        data-cy="button-password"
        className="cursor-pointer"
        onClick={handleShowPassword}
      >
        {IsShowPassword ? (
          <LockOpen
            size={38}
            weight="bold"
            className="p-2"
            data-cy="lock-open"
          />
        ) : (
          <Lock size={38} className="p-2" weight="bold" />
        )}
      </button>
    </>
  )
}
