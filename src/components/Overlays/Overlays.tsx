import { Fragment, useEffect } from 'react'
import useOverlayStore from '../../store/useOverlayStore'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

const Overlays = () => {
  const location = useLocation()
  const { overlays } = useOverlayStore((state) => state)

  useEffect(() => {
    overlays.forEach((overlay) => {
      if (overlay) overlay.props.onClose()
    })
  }, [location])

  return (
    <div>
      <AnimatePresence mode='wait'>
        {[...overlays.entries()].map(([id, element]) => (
          <Fragment key={id}>{element}</Fragment>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Overlays
