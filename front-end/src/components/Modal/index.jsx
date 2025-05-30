import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer, 
  usePortal = true 
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const titleId = title ? "modal-title" : undefined;
  const descriptionId = "modal-description";

  const modalContent = (
    <div className={styles.modalOverlay} onClick={onClose} role="presentation">
      <div
        className={styles.modalContent}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 id={titleId}>{title}</h2>}
        <div id={descriptionId} className={styles.modalBody}>
          {children}
        </div>
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </div>
  );

  return usePortal ? ReactDOM.createPortal(modalContent, document.body) : modalContent;
}
