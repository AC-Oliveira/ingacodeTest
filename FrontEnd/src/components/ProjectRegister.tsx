import { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import ManageContext from '../context/ManageContext';
import { IManageContext } from '../pages/Manage';
import projectService from '../services/project';
import { Input } from './Input';

export function ProjectRegister(): JSX.Element {
  const { setMessage, setShow, setError } = useContext<any>(GlobalContext);
  const { setNewProject, project, setProject, setProjectList, editProject, setEditProject }: IManageContext = useContext<any>(ManageContext);
  const [projectName, setProjectName] = useState(editProject ? project.Name : '');
  return (
    <div className="my-2 mx-auto bg-white d-flex flex-column align-items-center rounded border border-gray-200 p-3" style={{ maxWidth: '600px' }}>
      <h2 className="text-danger text-center">{editProject ? 'Renomear Projeto' : 'Cadastrar Projeto'}</h2>
      <Input
        value={projectName}
        type="text"
        className="form-control shadow-none"
        placeholder="Nome do projeto"
        onChange={({ target }) => setProjectName(target.value)}
      />
      <div style={{ maxWidth: '479.4px' }} className="d-flex gap-2 w-100 justify-content-center">
        <button
          onClick={async () => {
            if (!editProject) {
              const data: any = await projectService.createProject(projectName);
              setMessage(data.message);
              if (data.error) setError(data.error);
              else {
                setProject(data.Project);
                setProjectList((curr) => curr.set(data.Project.Id, data.Project));
              }
            } else {
              const data: any = await projectService.updateProjectName(project.Id, projectName);
              setMessage(data.message);
              if (data.Project) {
                setProject({ ...project, Name: data.Project.Name });
                setProjectList((curr) => curr.set(data.Project.Id, data.Project));
              } else {
                setError(data.error);
              }
            }
            setShow(true);
          }}
          type="button"
          className="btn btn-primary btn-border-radius-pill"
        >
          {editProject ? 'Renomear' : 'Cadastrar'}
        </button>
        <button
          onClick={() => {
            setNewProject(false);
            setEditProject(false);
          }}
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
