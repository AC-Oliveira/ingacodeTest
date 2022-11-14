import { useState } from 'react';
import projectService from '../services/project';
import { Input } from './Input';

interface IProjectRegister {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setNewProject: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProjectRegister({ setMessage, setShow, setNewProject }: IProjectRegister): JSX.Element {
  const [projectName, setProjectName] = useState('');
  return (
    <div className="my-2 mx-auto bg-white d-flex flex-column align-items-center rounded border border-gray-200 p-3" style={{ maxWidth: '1400px' }}>
      <h2 className="text-danger text-center">Cadastrar Projeto</h2>
      <Input type="text" className="form-control shadow-none" placeholder="Nome do projeto" onChange={({ target }) => setProjectName(target.value)} />
      <div style={{ maxWidth: '479.4px' }} className="d-flex gap-2 w-100 justify-content-center">
        <button
          onClick={async () => {
            const newMessage = await projectService.createProject(projectName);
            setMessage(newMessage);
            setShow(true);
          }}
          type="button"
          className="btn btn-primary btn-border-radius-pill"
        >
          Cadastrar
        </button>
        <button
          onClick={() => setNewProject(false)}
          type="button"
          className="btn btn-secondary btn-border-radius-pill"
          style={{ maxWidth: '479.4px' }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
