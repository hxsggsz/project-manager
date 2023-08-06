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
        data-testid="button"
        className="cursor-pointer"
        onClick={handleShowPassword}
      >
        {IsShowPassword ? (
          <LockOpen
            size={38}
            weight="bold"
            data-testid="lock-open"
            className="p-2 text-slate-600"
          />
        ) : (
          <Lock
            size={38}
            weight="bold"
            data-testid="lock-close"
            className="p-2 text-slate-600"
          />
        )}
      </button>
    </>
  )
}
