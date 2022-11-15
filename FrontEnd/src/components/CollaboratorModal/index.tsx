import { useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { ModalFooter } from './ModalFooter';
import { ModalBody } from './ModalBody';

interface ICollaborators {
  Id: string;
  Name: string;
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
  const myModal = document.getElementById('myModal');
  const myInput = document.getElementById('collaborators-input');

  myModal?.addEventListener('shown.bs.modal', () => {
    myInput?.focus();
  });
  const modalRef: any = useRef();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collaboratorName, setCollaboratorName] = useState('');
  const [addCollaboratorsList, setAddCollaboratorsList] = useState<ICollaborators[]>([]);

  const showModal = (): void => {
    const modal: any = modalRef.current;
    const bsModal = new Modal(modal, {
      backdrop: 'static',
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = (): void => {
    setCollaboratorName('');
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
            <ModalBody
              selectedCollaborators={selectedCollaborators}
              setCollaboratorName={setCollaboratorName}
              addCollaboratorsList={addCollaboratorsList}
              setAddCollaboratorsList={setAddCollaboratorsList}
            />
            <ModalFooter
              ProjectId={ProjectId}
              TaskId={TaskId}
              addCollaboratorsList={addCollaboratorsList}
              hideModal={hideModal}
              setAddCollaboratorsList={setAddCollaboratorsList}
              setCollaboratorName={setCollaboratorName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
