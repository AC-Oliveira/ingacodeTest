import { useContext } from 'react';
import timetrackerServices from '../../services/timetracker';
import GlobalContext from '../../context/GlobalContext';
import { ICollaborator, IProject, ITask, ITimeTracker } from '../../services';
import ManageContext from '../../context/ManageContext';
import CollaboratorModalContext from '../../context/CollaboratorModalContext';
import { ICollaboratorModalContext } from '.';

interface IModalFooterProps {
  hideModal: () => void;
  ProjectId: string;
  TaskId: string;
}

export function ModalFooter({ hideModal, ProjectId, TaskId }: IModalFooterProps): JSX.Element {
  const { setShow, setMessage } = useContext<any>(GlobalContext);
  const { setAddCollaboratorsList, addCollaboratorsList, setCollaboratorName, setCollaboratorsList }: ICollaboratorModalContext =
    useContext<any>(CollaboratorModalContext);
  const { project, setProject, projectList } = useContext<any>(ManageContext);
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
          const EndDate = new Date(Date.parse(String(new Date())) + 3);

          await Promise.all(
            addCollaboratorsList.map(async (collaborator: ICollaborator) => {
              const data = await timetrackerServices.addCollaborator(ProjectId, collaborator.Id, TaskId, EndDate);

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
          setAddCollaboratorsList([]);
          setCollaboratorName('');
          hideModal();
          setShow(true);

          const newCollaborators = messages.map((t) => t.TimeTracker);
          const taskIndex = project.Tasks.findIndex((t: ITask) => t.Id === TaskId);
          const newTasks: ITask[] = project.Tasks;

          if (!!newCollaborators.length) {
            newTasks[taskIndex].TimeTrackers = newTasks[taskIndex].TimeTrackers.concat(newCollaborators as ITimeTracker[]);
          }

          const newProject: IProject = { ...project, Tasks: newTasks };
          const newProjectListIndex = projectList.findIndex((p: IProject) => p.Id === ProjectId);
          const newProjectList: IProject[] = { ...projectList };
          newProjectList[newProjectListIndex] = newProject;

          console.log(newProjectList);

          setProject(newProject);
          // setProjectList(newProjectList);
        }}
        type="button"
        className="btn btn-primary"
      >
        Adcionar
      </button>
    </div>
  );
}
