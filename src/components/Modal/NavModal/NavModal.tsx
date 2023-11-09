import React, { useRef } from 'react'
import BaseModal from '../BaseModal'
import { ModalSides } from '../../../types/types'
import { Link } from 'react-router-dom'

interface ModalProps {
  onClose: () => void
  side?: ModalSides
}

const MENU = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/about',
    name: 'About',
  },
]

const NavModal: React.FC<ModalProps> = ({ side = 'left', onClose }) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <BaseModal onClose={onClose} side={side}>
      <div
        ref={ref}
        style={{
          border: '1px solid #ccc',
          padding: '30px',
          backgroundColor: '#ffffff',
          height: side === 'left' || side === 'right' ? '100%' : 'auto',
          width: side === 'top' || side === 'bottom' ? '100%' : 'auto',
        }}
      >
        <h5>Nav Modal</h5>
        {MENU.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          )
        })}
        <button onClick={() => onClose()}>닫기</button>
      </div>
    </BaseModal>
  )
}

export default NavModal
