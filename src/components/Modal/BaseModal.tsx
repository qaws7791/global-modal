import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useClickOutside from "../../hooks/useClickOutside";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
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

const getFocusableElements = (target: Element) => {
  const focusableElements =
    "a[href], button:not([disabled]), textarea, input, select";
  return target.querySelectorAll(focusableElements);
};

const BaseModal: React.FC<ModalProps> = ({ children, onClose, ...props }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  useClickOutside(modalRef, () => onClose());
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      // only execute if tab is pressed
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      if (!modalRef.current) return;
      // here we query all focusable elements, customize as your own need
      const focusableModalElements = getFocusableElements(modalRef.current);
      const firstElement = focusableModalElements[0] as HTMLElement;
      const lastElement = focusableModalElements[
        focusableModalElements.length - 1
      ] as HTMLElement;

      // if going forward by pressing tab and lastElement is active shift focus to first focusable element
      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        return e.preventDefault();
      }

      // if going backward by pressing tab and firstElement is active shift focus to last focusable element
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    };

    const focusedElementBeforeModal = document.activeElement as HTMLElement;
    if (modalRef.current) {
      const focusableModalElements = getFocusableElements(modalRef.current);
      const firstElement = focusableModalElements[0] as HTMLElement;
      firstElement.focus();
    }
    previousFocusRef.current = focusedElementBeforeModal;

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [onClose]);

  return (
    <>
      <ModalBackground />
      <ModalWrapper
        {...props}
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </ModalWrapper>
    </>
  );
};

export default BaseModal;
