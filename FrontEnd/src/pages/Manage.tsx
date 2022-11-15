import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { ManageMenu } from '../components/ManageMenu';
import { ManageModal } from '../components/ManageModal';
import { ProjectRegister } from '../components/ProjectRegister';
import { TaskRegister } from '../components/TaskRegister';
import ManageContext from '../context/ManageContext';
import { IProject, ITask } from '../services';
import projectServices from '../services/project';

export interface IManageContext {
  newProject: boolean;
  setNewProject: Dispatch<SetStateAction<boolean>>;
  newTask: boolean;
  setNewTask: Dispatch<SetStateAction<boolean>>;
  project: IProject;
  setProject: Dispatch<SetStateAction<IProject>>;
  taskList: ITask[];
  setTaskList: Dispatch<SetStateAction<ITask[]>>;
}

export default function Manage(): JSX.Element {
  const { newProject, newTask }: IManageContext = useContext<any>(ManageContext);

  const [projectList, setProjectList] = useState<IProject[]>([]);

  useEffect(() => {
    const getProjects = async (): Promise<void> => {
      const projects = await projectServices.getProjects();
      setProjectList(projects);
    };

    getProjects();
  }, []);

  return (
    <>
      <ManageModal />
      <div className="content px-2">
        <div className="h-100 pt-4 mb-2">
          <h1 className="text-center fw-bold text-blue-600 mb-4">Gerenciar Projetos</h1>
        </div>
        {!newProject && !newTask && <ManageMenu projectList={projectList} />}
        {newProject && <ProjectRegister />}
        {newTask && <TaskRegister />}
      </div>
    </>
  );
}
