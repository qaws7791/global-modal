import React, { ReactNode, useRef, useState } from "react";
import BaseModal from "../BaseModal";

interface ModalProps {
  title?: string;
  content?: ReactNode;
  onConfirm: (text: string) => void;
  onClose: () => void;
}

const PromptModal: React.FC<ModalProps> = ({
  title = "Prompt Modal",
  content,
  onConfirm,
  onClose,
}) => {
  const [text, setText] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  return (
    <BaseModal onClose={onClose}>
      <div
        ref={ref}
        style={{
          border: "1px solid #ccc",
          padding: "30px",
          backgroundColor: "#ffffff",
        }}
      >
        <h5>{title}</h5>
        {content && <p>{content}</p>}
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button onClick={() => onConfirm(text)}>확인</button>
        <button onClick={() => onClose()}>취소</button>
      </div>
    </BaseModal>
  );
};

export default PromptModal;
