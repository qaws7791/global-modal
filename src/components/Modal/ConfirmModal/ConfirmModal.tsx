import React, { ReactNode, useRef } from "react";
import BaseModal from "../BaseModal";
import useClickOutside from "../../../hooks/useClickOutside";

interface ModalProps {
  title?: string;
  content?: ReactNode;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({
  title = "Confirm Modal",
  content,
  onConfirm,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => onClose());

  return (
    <BaseModal>
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
        <button onClick={() => onConfirm()}>확인</button>
        <button onClick={() => onClose()}>취소</button>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
