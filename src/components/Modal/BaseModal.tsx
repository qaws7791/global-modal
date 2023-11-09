import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import useClickOutside from '../../hooks/useClickOutside'
import { ModalSides } from '../../types/types'
import { MODAL_SIDES } from '../../constants/modal.constants'
import { motion } from 'framer-motion'
import { ModalMotionVariants } from '../../styles/motion'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
  side?: ModalSides
}

const ModalWrapper = styled(motion.div)<{ side: ModalSides }>`
  overflow: hidden;
  position: fixed;
  ${({ side }) => {
    switch (side) {
      case MODAL_SIDES.LEFT:
        return css`
          top: 0;
          left: 0;
          height: 100vh;
          border-radius: 0 20px 20px 0;
        `
      case MODAL_SIDES.RIGHT:
        return css`
          top: 0;
          right: 0;
          height: 100vh;
          border-radius: 20px 0 0 20px;
        `
      case MODAL_SIDES.TOP:
        return css`
          top: 0;
          left: 0;
          width: 100vw;
          border-radius: 0 0 20px 20px;
        `
      case MODAL_SIDES.BOTTOM:
        return css`
          bottom: 0;
          left: 0;
          width: 100vw;
          border-radius: 20px 20px 0 0;
        `
      case MODAL_SIDES.CENTER:
        return css`
          top: 50%;
          left: 50%;
          border-radius: 20px;
        `
    }
  }}
`

const ModalBackground = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`

const getFocusableElements = (target: Element) => {
  const focusableElements =
    'a[href], button:not([disabled]), textarea, input, select'
  return target.querySelectorAll(focusableElements)
}

const BaseModal: React.FC<ModalProps> = ({
  children,
  onClose,
  side = MODAL_SIDES.CENTER,
  ...props
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useClickOutside(modalRef, () => onClose())

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      // only execute if tab is pressed
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      if (!modalRef.current) return
      // here we query all focusable elements, customize as your own need
      const focusableModalElements = getFocusableElements(modalRef.current)
      const firstElement = focusableModalElements[0] as HTMLElement
      const lastElement = focusableModalElements[
        focusableModalElements.length - 1
      ] as HTMLElement

      // if going forward by pressing tab and lastElement is active shift focus to first focusable element
      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus()
        return e.preventDefault()
      }

      // if going backward by pressing tab and firstElement is active shift focus to last focusable element
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    }

    const focusedElementBeforeModal = document.activeElement as HTMLElement
    if (modalRef.current) {
      const focusableModalElements = getFocusableElements(modalRef.current)
      const firstElement = focusableModalElements[0] as HTMLElement
      firstElement.focus()
    }
    previousFocusRef.current = focusedElementBeforeModal

    window.addEventListener('keydown', keyDownHandler)

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [onClose])

  return (
    <>
      <ModalBackground
        key='background'
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, type: 'spring' }}
      />
      <ModalWrapper
        custom={side}
        initial='closed'
        animate='open'
        exit='closed'
        variants={ModalMotionVariants}
        side={side}
        {...props}
        ref={modalRef}
        tabIndex={-1}
        role='dialog'
        aria-modal='true'
      >
        {children}
      </ModalWrapper>
    </>
  )
}

export default BaseModal
