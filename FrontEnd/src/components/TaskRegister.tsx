import { useState } from 'react';
import services from '../services';
import { Input } from './Input';

interface IProjectRegister {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setNewTask: React.Dispatch<React.SetStateAction<boolean>>;
  ProjectId: string;
}

export function TaskRegister({ setMessage, setShow, setNewTask, ProjectId }: IProjectRegister): JSX.Element {
  const [tasktName, setTasktName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  return (
    <div className="my-2 mx-auto bg-white d-flex flex-column align-items-center rounded border border-gray-200 p-3" style={{ maxWidth: '1400px' }}>
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
            const newMessage = await services.createTask(tasktName, ProjectId, taskDescription);
            setMessage(newMessage);
            setShow(true);
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
