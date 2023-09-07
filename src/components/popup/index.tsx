import * as HoverCard from '@radix-ui/react-hover-card'

interface PopUpProps {
  children: React.ReactNode
  content: string
}

export const PopUp = (props: PopUpProps) => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>{props.children}</HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content
          className="w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
          sideOffset={5}
        >
          <p className="text-base font-semibold">{props.content}</p>
          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
