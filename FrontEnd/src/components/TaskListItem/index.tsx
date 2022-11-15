import { useState } from 'react';
import { CollaboratorModal } from '../CollaboratorModal';
import { ICollaborator } from '../../services';
import { CollaboratorsList } from './CollaboratorsList';
import { TaskDescription } from './TaskDescription';
import { TaskDescriptionButtons } from './TaskDescriptionButtons';

interface ITaskListItemProps {
  description: string;
  collaborators?: ICollaborator[];
  taskName: string;
  taskStart: number;
  projectId: string;
  taskId: string;
}

export function TaskListItem({
  description: defaultDescription,
  collaborators,
  taskName: defaultTaskName,
  taskStart,
  projectId,
  taskId,
}: ITaskListItemProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(defaultTaskName);

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
        <small className="text-white">{`${taskStart} dias atras`}</small>
      </div>

      <div className="p-2">
        <TaskDescriptionButtons setIsEditing={setIsEditing} />

        <TaskDescription
          defaultDescription={defaultDescription}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          taskId={taskId}
          taskName={taskName}
        />
      </div>
      <div className="p-2">
        <div className="d-flex align-items-center mb-2">
          {!!collaborators?.length ? (
            <h6 className="text-blue-600 fw-semibold mb-0 flex-grow-1">Colaboradores:</h6>
          ) : (
            <small className="flex-grow-1">Nenhum colaborador foi adcionado a task</small>
          )}
          <CollaboratorModal TaskId={taskId} ProjectId={projectId} collaborators={collaborators?.map((e) => e.Name)} />
        </div>
        {!!collaborators?.length && <CollaboratorsList collaborators={collaborators} taskId={taskId} />}
      </div>
    </div>
  );
}
