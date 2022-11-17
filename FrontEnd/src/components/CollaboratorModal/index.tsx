import { Dispatch, SetStateAction, useRef } from 'react';
import { Modal } from 'bootstrap';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { ModalFooter } from './ModalFooter';
import { ModalBody } from './ModalBody';
import { ICollaborator } from '../../services';

export interface ICollaboratorModalContext {
  collaboratorName: string;
  setCollaboratorName: Dispatch<SetStateAction<string>>;
  addCollaboratorsList: ICollaborator[];
  setAddCollaboratorsList: Dispatch<SetStateAction<ICollaborator[]>>;
  collaboratorsList: ICollaborator[];
  setCollaboratorsList: Dispatch<SetStateAction<ICollaborator[]>>;
}

export function CollaboratorModal({
  ProjectId,
  TaskId,
  collaborators: selectedCollaborators,
}: {
  ProjectId: string;
  TaskId: string;
  collaborators: string[] | undefined;
}): JSX.Element {
  const selectModal = document.getElementById('myModal');
  const Input = document.getElementById('collaborators-input');

  selectModal?.addEventListener('shown.bs.modal', () => {
    Input?.focus();
  });
  const modalRef: any = useRef();

  const showModal = (): void => {
    const modal: any = modalRef.current;
    const bsModal = new Modal(modal, {
      backdrop: 'static',
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = (): void => {
    const modal: any = modalRef.current;
    const bsModal = Modal.getInstance(modal);
    bsModal?.hide();
  };

  return (
    <div>
      <button type="button" className="rounded-circle btn btn-link bg-white ms-auto shadow-none flex-grow-2" onClick={showModal}>
        <BsFillPersonPlusFill size={18} color="0a58ca" />
      </button>
      <div id="myModal" className="modal fade" ref={modalRef} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-semibold text-blue-600" id="staticBackdropLabel">
                Adcionar colaborador:
              </h5>
              <button type="button" className="btn-close" onClick={hideModal} aria-label="Close" />
            </div>
            <ModalBody selectedCollaborators={selectedCollaborators} />
            <ModalFooter ProjectId={ProjectId} TaskId={TaskId} hideModal={hideModal} />
          </div>
        </div>
      </div>
    </div>
  );
}
