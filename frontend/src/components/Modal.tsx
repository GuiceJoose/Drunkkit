import { ReactNode } from "react";

type Props = {
  onClick: React.MouseEventHandler;
  content: ReactNode;
};

const Modal = ({ content, onClick }: Props) => {
  return (
    <div className="modal-background">
      <div className="modal">
        {content}
        <button type="button" onClick={onClick}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
