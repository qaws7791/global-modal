import React from 'react';
import useModalStore, { isModalOpen } from '../../store/useModalStore';

interface ModalProps {
  modalId: string;
}

const BaseModal: React.FC<ModalProps> = ({ modalId }) => {
  // const isModalOpen = !!useModalStore((state)=>state.modals[modalId]);
  const closeModal = (value: boolean) => useModalStore.getState().closeModal(modalId, value); 

  
  if (!isModalOpen(modalId)) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Modal</p>
        <button onClick={() => closeModal(true)}>Confirm</button>
        <button onClick={() => closeModal(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default BaseModal;
