import { useContext, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { DebounceInput } from 'react-debounce-input';
import userServices from '../services/user';
import timetrackerServices from '../services/timetracker';
import GlobalContext from '../context/GlobalContext';

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
  const { setShow, setMessage } = useContext<any>(GlobalContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collaboratorName, setCollaboratorName] = useState('');
  const [addCollaboratorsList, setAddCollaboratorsList] = useState<ICollaborators[]>([]);
  const [collaboratorsList, setCollaboratorsList] = useState<ICollaborators[]>([]);

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

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setCollaboratorName(event.target.value);
    const collaborators: ICollaborators[] | { message: string } = await userServices.searchCollaborators(event.target.value);
    if (Array.isArray(collaborators)) {
      const filteredCollaborators = collaborators.filter((collaborator) => !selectedCollaborators?.includes(collaborator.Name));
      setCollaboratorsList(filteredCollaborators);
    }
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
            <div className="modal-body" style={{ minHeight: '350px' }}>
              <DebounceInput
                id="collaborators-input"
                className={`form-control shadow-none ${!!collaboratorsList.length && 'active-search'}`}
                onChange={onChange}
                minLength={1}
                debounceTimeout={1000}
              />
              <ul className={`list-group ${!!collaboratorsList.length && 'active-search'}`}>
                {collaboratorsList.map((collaborator, index) => {
                  const collaboratorSelected = addCollaboratorsList.some((e) => collaboratorsList.indexOf(e) === index);
                  return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                    <li
                      className={`list-group-item py-2 text-center ${collaboratorSelected && 'active'} add-collaborator`}
                      onClick={() => {
                        if (!collaboratorSelected) {
                          setAddCollaboratorsList((curr) => [...curr, collaborator]);
                        } else {
                          setAddCollaboratorsList((curr) => curr.filter((id) => id !== collaborator));
                        }
                      }}
                    >
                      {collaborator.Name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setAddCollaboratorsList([]);
                  setCollaboratorName('');
                  hideModal();
                }}
              >
                Fechar
              </button>
              <button
                onClick={async () => {
                  const messages: { name: string; message: string }[] = [];
                  const EndDate = new Date(Date.parse(String(new Date())) + 3);

                  await Promise.all(
                    addCollaboratorsList.map(async (collaborator) => {
                      const message = await timetrackerServices.addCollaborator(ProjectId, collaborator.Id, TaskId, EndDate);
                      messages.push({ name: collaborator.Name, message });
                    })
                  );

                  const messagesComponent = (
                    <div className="">
                      {messages.map((user) => (
                        <p>
                          <span className="text-danger fw-semibold">{user.name}: </span>
                          {user.message}
                        </p>
                      ))}
                    </div>
                  );

                  setMessage(messagesComponent);
                  setAddCollaboratorsList([]);
                  setCollaboratorName('');
                  hideModal();
                  setShow(true);
                }}
                type="button"
                className="btn btn-primary"
              >
                Adcionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
