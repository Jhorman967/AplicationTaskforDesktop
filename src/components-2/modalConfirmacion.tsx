import React from "react";
import { useState } from "react";

export const ModalConf = ({
  children,
  setShowModal,
  titleModal,
  handleSubmit,
  MenButton,
}) => {
  const saveData = () => {
    handleSubmit();
  };

  const toggleClose = () => {
    setShowModal(false);
  };
  return (
    <div
      className="modal"
      tabIndex={-1}
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title " style={{ color: "black" }}>
              {titleModal}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={toggleClose}
            >
              <span
                style={{ color: "black", fontWeight: "bold" }}
                aria-hidden="true"
              ></span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={saveData}>
              {MenButton}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={toggleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
