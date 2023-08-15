import React, { ReactNode, useRef } from "react";
import BaseModal from "../BaseModal";
interface ModalProps {
  title?: string;
  content?: ReactNode;
  onClose: () => void;
}

const AlertModal: React.FC<ModalProps> = ({
  title = "Alert Modal",
  content,
  onClose,
}) => {
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
        <button onClick={() => onClose()}>확인</button>
      </div>
    </BaseModal>
  );
};

export default AlertModal;
