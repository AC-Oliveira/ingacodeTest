import { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import ManageContext from '../context/ManageContext';
import { IManageContext } from '../pages/Manage';
import projectService from '../services/project';
import { Input } from './Input';

export function ProjectRegister(): JSX.Element {
  const { setMessage, setShow, setError } = useContext<any>(GlobalContext);
  const { setNewProject, setProject, setProjectList }: IManageContext = useContext<any>(ManageContext);
  const [projectName, setProjectName] = useState('');
  return (
    <div className="my-2 mx-auto bg-white d-flex flex-column align-items-center rounded border border-gray-200 p-3" style={{ maxWidth: '600px' }}>
      <h2 className="text-danger text-center">Cadastrar Projeto</h2>
      <Input type="text" className="form-control shadow-none" placeholder="Nome do projeto" onChange={({ target }) => setProjectName(target.value)} />
      <div style={{ maxWidth: '479.4px' }} className="d-flex gap-2 w-100 justify-content-center">
        <button
          onClick={async () => {
            const data: any = await projectService.createProject(projectName);
            setMessage(data.message);
            if (data.error) setError(data.error);
            else {
              setProject(data.Project);
              setProjectList((curr) => [...curr, data.Project]);
            }
            setShow(true);
          }}
          type="button"
          className="btn btn-primary btn-border-radius-pill"
        >
          Cadastrar
        </button>
        <button onClick={() => setNewProject(false)} type="button" className="btn btn-secondary btn-border-radius-pill" style={{ maxWidth: '479.4px' }}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
