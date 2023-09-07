import * as SwitchRad from '@radix-ui/react-switch'

interface SwitchProps {
  isChecked: boolean
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}

export const Switch = (props: SwitchProps) => {
  return (
    <SwitchRad.Root
      defaultChecked={props.isChecked}
      onCheckedChange={props.setIsChecked}
      className="relative h-[25px] w-[42px] cursor-pointer rounded-full border border-slate-300 shadow-md outline-none data-[state=checked]:bg-violet-main focus:shadow-[0_0_0_2px] focus:shadow-black"
      data-testid="switch"
    >
      <SwitchRad.Thumb className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-violet-main shadow-md transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px] data-[state=checked]:bg-white" />
    </SwitchRad.Root>
  )
}
