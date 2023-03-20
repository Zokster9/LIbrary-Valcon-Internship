import { RefObject } from 'react'
import './DeleteBookDialog.css'

interface DeleteBookDialogProps {
  dialogRef: RefObject<HTMLDialogElement>
  handleConfirm: () => void
}

const DeleteBookDialog = ({ dialogRef, handleConfirm }: DeleteBookDialogProps) => {
  const closeModal = () => {
    if (dialogRef)
      dialogRef.current?.close()
  }
  return (
    <dialog className='delete-dialog' ref={dialogRef}>
      <h1>Are you sure you want to delete this book?</h1>
      <p>Delete is permament and cannot be reverted!</p>
      <div className='delete-dialog-btns'>
        <button className='delete-dialog-btn close' onClick={closeModal}>Close</button>
        <button className='delete-dialog-btn confirm' onClick={handleConfirm}>Confirm</button>
      </div>
    </dialog>
  )
}
export default DeleteBookDialog
