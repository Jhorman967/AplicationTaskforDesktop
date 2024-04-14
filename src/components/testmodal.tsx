import React from "react";
import { useState, useEffect } from "react";

export const Boton = () => {
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
  
    // useEffect para ocultar los toasts automáticamente después de un tiempo
    useEffect(() => {
      let timeoutId1;
      let timeoutId2;
  
      if (showToast1) {
        // Ocultar el primer toast después de 3 segundos
        timeoutId1 = setTimeout(() => {
          setShowToast1(false);
        }, 3000);
      }
  
      if (showToast2) {
        // Ocultar el segundo toast después de 3 segundos
        timeoutId2 = setTimeout(() => {
          setShowToast2(false);
        }, 3000);
      }
  
      // Limpiar los timeouts al desmontar o cuando los estados cambian
      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
      };
    }, [showToast1, showToast2]);
  
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setShowToast1(true);
            setShowToast2(true);
          }}
        >
          Show live toasts
        </button>
  
        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div className={`toast ${showToast1 ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <img src="..." className="rounded me-2" alt="..." />
              <strong className="me-auto">Bootstrap</strong>
              <small className="text-muted">just now</small>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowToast1(false)}
              />
            </div>
            <div className="toast-body">
              See? Just like this.
            </div>
          </div>
  
                <div className={`toast ${showToast2 ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <img src="..." className="rounded me-2" alt="..." />
                        <strong className="me-auto">Bootstrap</strong>
                        <small className="text-muted">2 seconds ago</small>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setShowToast2(false)}
                        />
                    </div>
                     <div className="toast-body">
                         Heads up, toasts will stack automatically.
                    </div>
                </div>
        </div>
      </div>
    );
};