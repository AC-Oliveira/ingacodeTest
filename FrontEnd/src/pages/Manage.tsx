import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { ManageMenu } from '../components/ManageMenu';
import { ManageModal } from '../components/ManageModal';
import { ProjectRegister } from '../components/ProjectRegister';
import { TaskRegister } from '../components/TaskRegister';
import GlobalContext from '../context/GlobalContext';
import ManageContext from '../context/ManageContext';
import { IProject, ITask } from '../services';
import projectServices from '../services/project';
import timetrackerServices from '../services/timetracker';

export interface IManageContext {
  newProject: boolean;
  setNewProject: Dispatch<SetStateAction<boolean>>;
  newTask: boolean;
  setNewTask: Dispatch<SetStateAction<boolean>>;
  project: IProject;
  setProject: Dispatch<SetStateAction<IProject>>;
  taskList: Map<string, ITask>;
  setTaskList: Dispatch<SetStateAction<Map<string, ITask>>>;
  projectList: Map<string, IProject>;
  setProjectList: Dispatch<SetStateAction<Map<string, IProject>>>;
  editProject: boolean;
  setEditProject: Dispatch<SetStateAction<boolean>>;
  showTaskModal: boolean;
  setShowTaskModal: Dispatch<SetStateAction<boolean>>;
  taskModalMessage: string;
  setTaskModalMessage: Dispatch<SetStateAction<string>>;
  close: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
  task: ITask;
  setTask: Dispatch<SetStateAction<ITask>>;
  deleteProject: boolean;
  setDeleteProject: Dispatch<SetStateAction<boolean>>;
}

export default function Manage(): JSX.Element {
  const { newProject, newTask, setProject, setProjectList, setTaskList }: IManageContext = useContext<any>(ManageContext);
  const { activeTask, setActiveTask } = useContext<any>(GlobalContext);

  useEffect(() => {
    const getProjects = async (): Promise<void> => {
      const projects = await projectServices.getProjects();
      const mapProjects: any = new Map();
      projects.forEach((project) => {
        mapProjects.set(project.Id, project);
      });
      setProjectList(mapProjects);
      if (!!projects.length) {
        setProject(projects[0]);
        const tasksMap = new Map();
        projects[0].Tasks.forEach((task) => {
          tasksMap.set(task.Id, task);
        });
        setTaskList(tasksMap);
      }
    };

    const findActiveTask = async (): Promise<void> => {
      if (!activeTask) {
        const data = await timetrackerServices.getActiveOrLastTimeTrackerByCollaborator();
        if (data.TaskId) setActiveTask(data.TaskId);
      }
    };

    getProjects();
    findActiveTask();
  }, []);

  return (
    <>
      <ManageModal />
      <div className="content px-2">
        <div className="h-100 pt-4 mb-2">
          <h1 className="text-center fw-bold text-blue-600 mb-4">Gerenciar Projetos</h1>
        </div>
        {!newProject && !newTask && <ManageMenu />}
        {newProject && <ProjectRegister />}
        {newTask && <TaskRegister />}
      </div>
    </>
  );
}
