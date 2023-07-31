import { Title } from '@radix-ui/react-dialog'

export const TitleModal = ({ title }: { title: string }) => {
  return <Title className="m-0 text-[17px] font-medium">{title}</Title>
}
