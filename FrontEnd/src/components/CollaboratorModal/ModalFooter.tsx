import { useContext } from 'react';
import timetrackerServices from '../../services/timetracker';
import GlobalContext from '../../context/GlobalContext';
import { ICollaborator, IProject, ITask, ITimeTracker } from '../../services';
import ManageContext from '../../context/ManageContext';
import CollaboratorModalContext from '../../context/CollaboratorModalContext';
import { ICollaboratorModalContext } from '.';
import { IManageContext } from '../../pages/Manage';

interface IModalFooterProps {
  hideModal: () => void;
  ProjectId: string;
  TaskId: string;
}

export function ModalFooter({ hideModal, ProjectId, TaskId }: IModalFooterProps): JSX.Element {
  const { setShow, setMessage } = useContext<any>(GlobalContext);
  const { setAddCollaboratorsList, addCollaboratorsList, setCollaboratorName, setCollaboratorsList }: ICollaboratorModalContext =
    useContext<any>(CollaboratorModalContext);
  const { project, setProject, setProjectList }: IManageContext = useContext<any>(ManageContext);
  return (
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          setAddCollaboratorsList([]);
          setCollaboratorsList([]);
          setCollaboratorName('');
          hideModal();
        }}
      >
        Fechar
      </button>
      <button
        onClick={async () => {
          const messages: { name: string; message: string; TimeTracker?: ITimeTracker }[] = [];
          const now = new Date();
          now.setMilliseconds(now.getMilliseconds() + 1000);
          const EndDate = now;

          await Promise.all(
            addCollaboratorsList.map(async (collaborator: ICollaborator) => {
              const data = await timetrackerServices.addCollaborator(ProjectId, collaborator.Id, TaskId);

              messages.push({
                name: collaborator.Name,
                message: data.message.replace('TimeTracker criado', 'Colaborador adcionado'),
                TimeTracker: data.TimeTracker,
              });
            })
          );

          const messagesComponent = (
            <div>
              {messages.map((user) => (
                <p key={`user-${user.name}`}>
                  <span className="text-danger fw-semibold">{user.name}: </span>
                  {user.message}
                </p>
              ))}
            </div>
          );

          setMessage(messagesComponent);
          setCollaboratorsList([]);
          setCollaboratorName('');
          hideModal();
          setShow(true);

          const newCollaborators = messages.map((t) => t.TimeTracker);
          const taskIndex = project.Tasks.findIndex((t: ITask) => t.Id === TaskId);
          const newTasks: ITask[] = project.Tasks;

          if (!!newCollaborators.length) {
            if (newTasks[taskIndex].TimeTrackers) {
              newTasks[taskIndex].TimeTrackers = newTasks[taskIndex].TimeTrackers.concat(newCollaborators as ITimeTracker[]);
            } else {
              newTasks[taskIndex].TimeTrackers = newCollaborators as ITimeTracker[];
            }
          }

          const newProject: IProject = { ...project, Tasks: newTasks };

          setProject(newProject);
          setProjectList((curr) => curr.set(newProject.Id, newProject));
        }}
        type="button"
        disabled={!addCollaboratorsList.length}
        className="btn btn-primary"
      >
        Adcionar
      </button>
    </div>
  );
}
