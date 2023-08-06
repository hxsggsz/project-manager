import { Modal } from '.'
import { render, screen } from '@testing-library/react'

describe('<Modal/>', () => {
  it('should render the title component correctly', () => {
    const setIsOpen = jest.fn()
    render(
      <Modal.Root isOpen setIsOpen={setIsOpen}>
        <Modal.Title title="test" />
      </Modal.Root>,
    )

    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('should render the modal if is open', async () => {
    const setIsOpen = jest.fn()
    render(
      <Modal.Root isOpen setIsOpen={setIsOpen}>
        <Modal.Content isOpen>test</Modal.Content>
      </Modal.Root>,
    )
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('should not render the modal if is open', async () => {
    const setIsOpen = jest.fn()
    render(
      <Modal.Root isOpen={false} setIsOpen={setIsOpen}>
        <Modal.Content isOpen={false}>test</Modal.Content>
      </Modal.Root>,
    )
    expect(screen.queryByText('test')).not.toBeInTheDocument()
  })
})
