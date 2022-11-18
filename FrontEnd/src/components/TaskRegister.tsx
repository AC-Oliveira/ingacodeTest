import { useContext, useState } from 'react';
import { Input } from './Input';
import taskServices from '../services/task';
import GlobalContext from '../context/GlobalContext';
import ManageContext from '../context/ManageContext';
import { IManageContext } from '../pages/Manage';

export function TaskRegister(): JSX.Element {
  const { setMessage, setShow, setError } = useContext<any>(GlobalContext);
  const { setNewTask, project, setTaskList, setProject, setProjectList }: IManageContext = useContext<any>(ManageContext);
  const [tasktName, setTasktName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  return (
    <div className="my-2 mx-auto bg-white d-flex flex-column align-items-center rounded border border-gray-200 p-3" style={{ maxWidth: '600px' }}>
      <h2 className="text-danger text-center">Cadastrar Task</h2>
      <Input type="text" className="form-control shadow-none" placeholder="Nome da Task" onChange={({ target }) => setTasktName(target.value)} />
      <textarea
        onChange={({ target }) => setTaskDescription(target.value)}
        style={{ maxWidth: '479.4px' }}
        className="form-control"
        cols={30}
        rows={15}
        placeholder="Descrição da task"
      />
      <div style={{ maxWidth: '479.4px' }} className="mt-2 d-flex gap-2 w-100 justify-content-center">
        <button
          onClick={async () => {
            const data: any = await taskServices.createTask(tasktName, project.Id, taskDescription);
            setMessage(data.message);
            if (data.error) setError(data.error);
            setShow(true);

            if (data.Task) {
              const newProject = { ...project, Tasks: [...project.Tasks, data.Task] };
              setTaskList((curr) => curr.set(data.Task.Id, data.Task));
              setProject(newProject);
              setProjectList((curr) => curr.set(newProject.Id, newProject));
            }
          }}
          type="button"
          className="btn btn-primary btn-border-radius-pill"
        >
          Cadastrar
        </button>
        <button onClick={() => setNewTask(false)} type="button" className="btn btn-secondary btn-border-radius-pill" style={{ maxWidth: '479.4px' }}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
