import { useContext, useEffect, useState } from 'react';
import { CollaboratorModal } from '../CollaboratorModal';
import { CollaboratorsList } from './CollaboratorsList';
import { TaskDescription } from './TaskDescription';
import { TaskDescriptionButtons } from './TaskDescriptionButtons';
import ManageContext from '../../context/ManageContext';
import { IManageContext } from '../../pages/Manage';
import { ICollaborator, IProject, ITask } from '../../services';
import { CollaboratorModalProvider } from '../../context/CollaboratorModalProvider';
import { TaskTimer } from './TaskTimer';
import GlobalContext from '../../context/GlobalContext';
import projectServices from '../../services/project';
import timetrackerServices from '../../services/timetracker';

export function TaskListItem({ task }: { task: ITask }): JSX.Element {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10600);
  const { project, setProject, projectList, setProjectList }: IManageContext = useContext<any>(ManageContext);
  const { activeTask, setActiveTask, setActiveProject } = useContext<any>(GlobalContext);
  const [collaborators, setCollaborators] = useState<ICollaborator[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.Name);

  const findCollaborators = task.TimeTrackers?.map((timeTracker) => timeTracker?.Collaborator);

  const collaboratorsList = findCollaborators?.filter((collaborator, idx) => findCollaborators?.findIndex((c) => c?.Id === collaborator?.Id) === idx);

  useEffect(() => {
    setCollaborators(collaboratorsList);
  }, [project]);

  const calcDays = (date: Date): number => {
    const today = String(new Date());
    const dateString = String(new Date(date));

    const msDiff: number = Date.parse(today) - Date.parse(dateString);
    const diff = Math.floor(msDiff / (1000 * 3600 * 24));
    return diff;
  };

  return (
    <div className="list-group-item list-group-item-action bg-gray-100" aria-current="true">
      <div className="row w-100 bg-danger p-2 align-items-center mx-0">
        {!isEditing && <h5 className="col-12 col-md-6 mb-0 text-white">{taskName}</h5>}
        {isEditing && (
          <input
            value={taskName}
            onChange={({ target }) => setTaskName(target.value)}
            className="col-12 col-md-6 mb-1 text-gray-900 rounded-pill ps-3 border border-blue-600 border-3"
          />
        )}
        <div className="col-6 col-md-3 d-flex justify-content-center mt-2 mt-md-0">
          <button
            onClick={async () => {
              setActiveTask(task.Id);
              const data: any = await projectServices.findActiveProject(task.Id);
              if (data) {
                setActiveProject(data);
                const isCollaborator = collaborators.some((e) => e.Id === data.userId);

                const newProject = projectList.get(data.Id) as IProject;

                if (!isCollaborator) {
                  const EndDate = new Date(Date.parse(String(new Date())) + 3);
                  setCollaborators((curr) => [...curr, { Name: data.username, Id: data.userId }]);
                  const collaboratorData = (await timetrackerServices.addCollaborator(data.Id, data.userId, task.Id)) as any;
                  const taskIndex = newProject.Tasks.findIndex((t) => t.Id === task.Id);
                  const newTasks: ITask[] = [...newProject.Tasks];
                  newTasks[taskIndex].TimeTrackers.push(collaboratorData.TimeTracker);
                  setProjectList((curr) => curr.set(data.Id, { ...newProject, Tasks: newTasks }));
                }

                setProject(newProject);
                setActiveProject(data.Id);
              }
            }}
            type="button"
            className={`${activeTask === task.Id && 'd-none'} btn btn-link text-decoration-none bg-white py-1`}
          >
            <p className="mb-0 text-blue-600 text-center">Iniciar</p>
          </button>

          <div className={`${activeTask !== task.Id && 'd-none'} bg-blue-600 p-1 rounded-pill`}>
            {/* eslint-disable */}
            <TaskTimer offsetTimestamp={time} />
          </div>
        </div>
        <small className="col-6 col-md-3 text-white text-end mt-2 mt-md-0">{`${calcDays(task.CreatedAt)} d`}</small>
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
