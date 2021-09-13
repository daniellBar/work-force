import React from "react";
import ReactDom from "react-dom";

export function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal">{children}</div>
    </>,
    document.getElementById("portal")
  );
}
