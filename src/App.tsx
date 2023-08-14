import "./App.css";
import usePopup from "./hooks/usePopup";
import useOverlayStore from "./store/useOverlayStore";
import { Fragment } from "react";
function App() {
  const { overlays } = useOverlayStore((state) => state);
  const { openPopup } = usePopup();

  const handleOpenAlert = async () => {
    await openPopup({
      type: "alert",
      title: "경고 모달",
      content: "버튼이 1개인 모달입니다.",
    });
    console.log("Alert 모달에서 확인을 눌렀습니다.");
  };

  const handleOpenConfirm = async () => {
    const confirm = await openPopup({
      type: "confirm",
      title: "확인 모달",
      content: "버튼이 2개인 모달입니다.",
    });
    console.log(
      "Confirm 모달에서 " +
        (confirm ? "확인을 눌렀습니다." : "취소를 눌렀습니다.")
    );
  };

  const handleOpenPrompt = async () => {
    const confirm = await openPopup({
      type: "prompt",
      title: "입력 모달",
      content: "입력할 수 있는 모달입니다.",
    });
    if (confirm !== null)
      console.log("Prompt 모달에서 " + confirm + "을 입력했습니다");
  };

  return (
    <>
      <div>
        <h1>Zustand Modal Example</h1>
        <button onClick={handleOpenAlert}>Alert 모달 열기</button>
        <button onClick={handleOpenConfirm}>Confirm 모달열기</button>
        <button onClick={handleOpenPrompt}>Prompt 모달열기</button>
        {/* <button onClick={()=>openModal('modal1')}>Open Modal 1</button>
      <button onClick={() => openModal('modal2')}>Open Modal 2</button>
      <BaseModal modalId="modal1" />
      <BaseModal modalId="modal2" /> */}
        {[...overlays.entries()].map(([id, element]) => (
          <Fragment key={id}>{element}</Fragment>
        ))}
      </div>
    </>
  );
}

export default App;
