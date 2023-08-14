import AlertModal from "../components/Modal/AlertModal";
import ConfirmModal from "../components/Modal/ConfirmModal";
import PromptModal from "../components/Modal/PromptModal";
import useOverlay from "./useOverlay";
import { ReactNode } from "react";
interface openPopupProps {
  type: "alert" | "confirm" | "prompt";
  title?: string;
  content?: ReactNode;
}

const usePopup = () => {
  const overlay = useOverlay();

  const openPopup = ({ type, title, content }: openPopupProps) =>
    new Promise((resolve) => {
      overlay.open(({ close }) => {
        switch (type) {
          case "alert":
            return (
              <AlertModal
                title={title}
                content={content}
                onClose={() => {
                  resolve(true);
                  close();
                }}
              />
            );
          case "confirm":
            return (
              <ConfirmModal
                title={title}
                content={content}
                onConfirm={() => {
                  resolve(true);
                  close();
                }}
                onClose={() => {
                  resolve(false);
                  close();
                }}
              />
            );

          case "prompt":
            return (
              <PromptModal
                title={title}
                content={content}
                onConfirm={(text) => {
                  resolve(text);
                  close();
                }}
                onClose={() => {
                  resolve(null);
                  close();
                }}
              />
            );
        }
      });
    });

  return {
    openPopup,
  };
};

export default usePopup;
