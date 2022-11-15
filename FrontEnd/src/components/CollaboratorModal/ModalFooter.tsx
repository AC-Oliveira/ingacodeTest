import { Dispatch, SetStateAction, useContext } from 'react';
import timetrackerServices from '../../services/timetracker';
import GlobalContext from '../../context/GlobalContext';
import { ICollaborator } from '../../services';

interface IModalFooterProps {
  setAddCollaboratorsList: Dispatch<SetStateAction<ICollaborator[]>>;
  setCollaboratorName: Dispatch<SetStateAction<string>>;
  hideModal: () => void;
  addCollaboratorsList: ICollaborator[];
  ProjectId: string;
  TaskId: string;
}

export function ModalFooter({
  setAddCollaboratorsList,
  setCollaboratorName,
  hideModal,
  addCollaboratorsList,
  ProjectId,
  TaskId,
}: IModalFooterProps): JSX.Element {
  const { setShow, setMessage } = useContext<any>(GlobalContext);
  return (
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
  );
}
