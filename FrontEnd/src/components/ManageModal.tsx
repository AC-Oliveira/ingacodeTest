import { useContext, useEffect, useRef } from 'react';
import * as bootstrap from 'bootstrap';
import GlobalContext from '../context/GlobalContext';
import ManageContext from '../context/ManageContext';

export function ManageModal(): JSX.Element {
  const { show, message, setShow } = useContext<any>(GlobalContext);
  const { newTask, setNewTask, newProject, setNewProject } = useContext<any>(ManageContext);
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
                if (newTask) setNewTask(false);
                if (newProject) setNewProject(false);
                setShow(false);
                hideModal();
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
