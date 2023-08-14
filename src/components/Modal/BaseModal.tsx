import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface ModalProps {
  children: React.ReactNode;
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
`;

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const BaseModal: React.FC<ModalProps> = ({ children, ...props }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [previousFocus, setPreviousFocus] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const focusedElementBeforeModal = document.activeElement as HTMLElement;
    console.log(focusedElementBeforeModal)
    console.log(modalRef.current)
    if (modalRef.current) {
      modalRef.current.focus();
    }

    setPreviousFocus(focusedElementBeforeModal);

    return () => {
      if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, []);

  return (
    <>
      <ModalBackground />
      <ModalWrapper {...props} ref={modalRef}>
        {children}
      </ModalWrapper>
    </>
  );
};

export default BaseModal;
