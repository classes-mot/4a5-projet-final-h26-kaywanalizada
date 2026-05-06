import { createPortal } from "react-dom";
import "./Modal.css";
import { useTranslation } from "react-i18next";

function Modal({ isOpen, onClose, onConfirm, children }) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}

        <div className="modal-actions">
          {onConfirm && (
            <button className="confirm" onClick={onConfirm}>
              {t("Confirmer")}
            </button>
          )}
          <button className="cancel" onClick={onClose}>
            {t("Annuler")}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}

export default Modal;
// a faire
