import { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import * as bootstrap from 'bootstrap';
import GlobalContext from '../context/GlobalContext';

interface ICustomModal {
  setNewTask?: Dispatch<SetStateAction<boolean>>;
  setNewProject?: Dispatch<SetStateAction<boolean>>;
}

export function CustomModal({ setNewTask, setNewProject }: ICustomModal): JSX.Element {
  const { show, message } = useContext<any>(GlobalContext);
  const modalRef: any = useRef();

  const showModal = (): void => {
    const modalEle: any = modalRef.current;
    const bsModal = new bootstrap.Modal(modalEle, {
      backdrop: 'static',
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = (): void => {
    const modalEle: any = modalRef.current;
    const bsModal = bootstrap.Modal.getInstance(modalEle);
    bsModal?.hide();
  };

  useEffect(() => {
    if (show) {
      showModal();
    }
  }, [show]);

  return (
    <div className="addEmployee">
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
                  if (setNewTask) setNewTask(false);
                  if (setNewProject) setNewProject(false);
                  hideModal();
                  window.location.reload();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
