import { Dispatch, useContext, useState } from 'react';
import taskServices from '../../services/task';

import GlobalContext from '../../context/GlobalContext';
import ManageContext from '../../context/ManageContext';
import { ITask } from '../../services';

interface ITaskDescriptionProps {
  isEditing: boolean;
  setIsEditing: Dispatch<React.SetStateAction<boolean>>;
  taskName: string;
  task: {
    Id: string;
    Description: string;
  };
}

export function TaskDescription({ isEditing, setIsEditing, taskName, task }: ITaskDescriptionProps): JSX.Element {
  const { setMessage, setShow, setError } = useContext<any>(GlobalContext);
  const { project, setProject, projectList, setProjectList } = useContext<any>(ManageContext);
  const { Id, Description } = task;

  const [description, setDescription] = useState(Description);
  if (!isEditing) return <p className="mb-1">{description}</p>;
  return (
    <div className="form-floating d-flex flex-column">
      <textarea
        value={description}
        style={{ minHeight: '300px' }}
        onChange={({ target }) => setDescription(target.value)}
        className="form-control shadow-none"
        placeholder="Leave a comment here"
        id="floatingTextarea2"
      />
      <div className="row justify-content-center gap-sm-3">
        <button
          onClick={async () => {
            const data = await taskServices.updateTask(Id, description, taskName);
            setMessage(data.message);
            if (data.error) setError(true);
            if (data.Task) {
              const newTaskIndex = project.Tasks.findIndex((t: ITask) => t.Id === data?.Task?.Id);
              const projectIndex = projectList.findIndex((p: any) => p.Id === project.Id);
              const newProject = { ...project };
              newProject.Tasks[newTaskIndex] = data.Task;
              const newProjectList = [...projectList];
              newProjectList[projectIndex] = newProject;
              setProject(newProject);
              setProjectList(newProjectList);
            }
            setShow(true);
            setIsEditing(false);
          }}
          className="col col-6 btn btn-primary my-2"
          type="button"
          style={{ width: '200px' }}
        >
          Salvar
        </button>
        <button
          onClick={() => {
            setIsEditing(false);
            setDescription(Description);
          }}
          className="col col-6 btn btn-secondary my-2"
          type="button"
          style={{ width: '200px' }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
