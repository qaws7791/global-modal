
import './App.css'
import BaseModal from './components/Modal/BaseModal';
import useModalStore from './store/useModalStore';

function App() {
  const { openModal } = useModalStore((state) => state);


  return (
    <>
      <div>
      <h1>Zustand Modal Example</h1>
      <button onClick={()=>openModal('modal1')}>Open Modal 1</button>
      <button onClick={() => openModal('modal2')}>Open Modal 2</button>
      <BaseModal modalId="modal1" />
      <BaseModal modalId="modal2" />
    </div>
    </>
  )
}

export default App
