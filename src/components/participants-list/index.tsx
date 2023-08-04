import { Participants } from '@/hooks/types/participants'
import { api } from '@/lib/api'
import * as HoverCard from '@radix-ui/react-hover-card'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import { ReactNode, useEffect, useState } from 'react'

const token = getCookie('token')

export const ParticipantsList = ({
  children,
  id,
}: {
  children: ReactNode
  id: string
}) => {
  const [projectId, setProjectId] = useState('')
  const [isHoverCardOpen, setIsHoverCardOpen] = useState(false)
  const [participants, setParticipants] = useState<Participants | null>(null)

  useEffect(() => {
    async function fetchParticipants() {
      if (projectId !== '' && isHoverCardOpen) {
        const response = await api.get<Participants>(
          `/participant/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        setParticipants(response.data)
      }
    }

    fetchParticipants()
  }, [projectId, isHoverCardOpen])

  return (
    <HoverCard.Root
      open={isHoverCardOpen}
      onOpenChange={(open) => {
        setIsHoverCardOpen(open)
        setProjectId(id)
      }}
    >
      <HoverCard.Trigger className="text-violet-main underline">
        {children}
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content
          className="grid w-[300px] place-items-center gap-y-4 rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
          sideOffset={5}
        >
          {participants?.allParticipants.map((part) => (
            <div
              key={part.id}
              className="flex w-full items-center gap-2 rounded-md bg-slate-200 p-2"
            >
              <Image
                width={38}
                height={38}
                src={part.profilePhoto}
                alt={`profile picture of ${part.name}`}
                className="pointer-events-none select-none rounded-full"
              />

              <div>
                <h1 className="text-base font-normal">{part.name}</h1>
                <p className="text-sm text-slate-500">{part.username}</p>
              </div>
            </div>
          ))}
          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
