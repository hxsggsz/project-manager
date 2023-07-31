import { CloseModal } from './close'
import { ContentModal } from './content'
import { RootModal } from './root'
import { TitleModal } from './title'
import { TriggerModal } from './trigger'

export const Modal = {
  Root: RootModal,
  Trigger: TriggerModal,
  Content: ContentModal,
  Title: TitleModal,
  Close: CloseModal,
}
