import { Outlet } from 'react-router-dom'
import Overlays from '../components/Overlays/Overlays'
import useOverlay from '../hooks/useOverlay'
import NavModal from '../components/Modal/NavModal'
import { ModalSides } from '../types/types'

const Layout = () => {
  const overlay = useOverlay()

  const handleOpenMenu = (side: ModalSides) => {
    return new Promise((resolve) => {
      overlay.open(({ close }) => {
        return (
          <NavModal
            side={side}
            onClose={() => {
              resolve(true)
              close()
            }}
          />
        )
      })
    })
  }

  return (
    <div>
      <div>
        <button onClick={() => handleOpenMenu('left')}>Left 메뉴 열기</button>
        <button onClick={() => handleOpenMenu('right')}>Right 메뉴 열기</button>
        <button onClick={() => handleOpenMenu('top')}>Top 메뉴 열기</button>
        <button onClick={() => handleOpenMenu('bottom')}>
          Bottom 메뉴 열기
        </button>
      </div>
      <Outlet />
      <Overlays />
    </div>
  )
}

export default Layout
