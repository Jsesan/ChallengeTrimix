import { BUTTON_LABELS } from "@/constants";
import React, { ReactNode } from "react";
type ModalProps = {
  setIsOpen: Function;
  confirmCallback: Function;
  children: ReactNode;
};
const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const { children, setIsOpen, confirmCallback } = props;
  return (
    <div className={`modal`}>
      <div className="bg-white max-w-[600px] rounded-lg p-7 flex flex-col items-center gap-5">
        {children}
        <div className="flex justify-around gap-6">
          <button className="cancelar-button" onClick={() => setIsOpen(false)}>
            {BUTTON_LABELS.CANCELAR}
          </button>
          <button
            className="confirmar-button"
            onClick={() => confirmCallback()}
          >
            {BUTTON_LABELS.BORRAR}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
