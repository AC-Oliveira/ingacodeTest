import * as bootstrap from 'bootstrap';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

interface ICustomModal {
  show: boolean;
  message: string;
  deleteTask?: () => Promise<void>;
  setTasks: () => void;
  setShowTaskModal: Dispatch<SetStateAction<boolean>>;
  close?: boolean;
  error?: boolean;
}

export function TaskModal({ show, message, deleteTask, setTasks, setShowTaskModal, close = false, error = false }: ICustomModal): JSX.Element {
  const modalRef: any = useRef();

  const showModal = (): void => {
    const modal: any = modalRef.current;
    const bsModal = new bootstrap.Modal(modal, {
      backdrop: 'static',
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = (): void => {
    const modal: any = modalRef.current;
    const bsModal = bootstrap.Modal.getInstance(modal);
    bsModal?.hide();
  };

  useEffect(() => {
    if (show) {
      showModal();
    }
  }, [show]);

  return (
    <div className="modal fade" ref={modalRef} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-semibold text-blue-600" id="staticBackdropLabel">
              Alerta!
            </h5>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                hideModal();
                if (close && !error) setTasks();
                setShowTaskModal(false);
              }}
            >
              {close ? 'Fechar' : 'Não'}
            </button>
            {!close && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (deleteTask) deleteTask();
                  setShowTaskModal(false);
                }}
              >
                Sim
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
