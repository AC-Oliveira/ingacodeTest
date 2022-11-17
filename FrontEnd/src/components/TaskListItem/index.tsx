import { useContext, useEffect, useState } from 'react';
import { CollaboratorModal } from '../CollaboratorModal';
import { CollaboratorsList } from './CollaboratorsList';
import { TaskDescription } from './TaskDescription';
import { TaskDescriptionButtons } from './TaskDescriptionButtons';
import ManageContext from '../../context/ManageContext';
import { IManageContext } from '../../pages/Manage';
import { ICollaborator, ITask } from '../../services';
import { CollaboratorModalProvider } from '../../context/CollaboratorModalProvider';

export function TaskListItem({ task }: { task: ITask }): JSX.Element {
  const { project }: IManageContext = useContext<any>(ManageContext);
  const [collaborators, setCollaborators] = useState<ICollaborator[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.Name);

  const findCollaborators = task.TimeTrackers?.map((timeTracker) => timeTracker?.Collaborator);

  const collaboratorsList = findCollaborators?.filter((collaborator, idx) => findCollaborators?.findIndex((c) => c?.Name === collaborator?.Name) === idx);

  useEffect(() => {
    setCollaborators(collaboratorsList);
  }, [collaboratorsList]);

  const calcDays = (date: Date): number => {
    const today = String(new Date());
    const dateString = String(new Date(date));

    const msDiff: number = Date.parse(today) - Date.parse(dateString);
    const diff = Math.floor(msDiff / (1000 * 3600 * 24));
    return diff;
  };

  return (
    <div className="list-group-item list-group-item-action bg-gray-100" aria-current="true">
      <div className="d-flex flex-column  flex-md-row w-100 justify-content-between bg-danger p-2">
        {!isEditing && <h5 className="mb-1 text-white">{taskName}</h5>}
        {isEditing && (
          <input
            value={taskName}
            onChange={({ target }) => setTaskName(target.value)}
            className="mb-1 text-gray-900 rounded-pill ps-3 border border-blue-600 border-3"
          />
        )}
        <small className="text-white">{`${calcDays(task.CreatedAt)} dias atras`}</small>
      </div>

      <div className="p-2">
        <TaskDescriptionButtons Id={task.Id} setIsEditing={setIsEditing} />

        <TaskDescription isEditing={isEditing} setIsEditing={setIsEditing} taskName={taskName} task={task} />
      </div>
      <div className="p-2">
        <div className="d-flex align-items-center mb-2">
          {!!collaborators?.length ? (
            <h6 className="text-blue-600 fw-semibold mb-0 flex-grow-1">Colaboradores:</h6>
          ) : (
            <small className="flex-grow-1">Nenhum colaborador foi adcionado a task</small>
          )}
          <CollaboratorModalProvider>
            <CollaboratorModal TaskId={task.Id} ProjectId={project.Id} collaborators={collaborators?.map((e) => e?.Name)} />
          </CollaboratorModalProvider>
        </div>
        {!!collaborators?.length && <CollaboratorsList collaborators={collaborators} taskId={task.Id} />}
      </div>
    </div>
  );
}
