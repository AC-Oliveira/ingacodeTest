import { ReactNode, useMemo, useState } from 'react';
import ManageContext from './ManageContext';

export function ManageProvider({ children }: { children: ReactNode }): JSX.Element {
  const [newProject, setNewProject] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [project, setProject] = useState({});
  const [task, setTask] = useState({});
  const [taskList, setTaskList] = useState();
  const [projectList, setProjectList] = useState([]);
  const [editProject, setEditProject] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskModalMessage, setTaskModalMessage] = useState('');
  const [close, setClose] = useState(false);
  const [deleteProject, setDeleteProject] = useState(false);

  const contextProviderValue = useMemo(
    () => ({
      newProject,
      setNewProject,
      newTask,
      setNewTask,
      project,
      setProject,
      taskList,
      setTaskList,
      projectList,
      setProjectList,
      editProject,
      setEditProject,
      showTaskModal,
      setShowTaskModal,
      taskModalMessage,
      setTaskModalMessage,
      close,
      setClose,
      task,
      setTask,
      deleteProject,
      setDeleteProject,
    }),
    [newProject, newTask, project, taskList, projectList, editProject, showTaskModal, taskModalMessage, close, task, deleteProject]
  );

  return <ManageContext.Provider value={contextProviderValue}>{children}</ManageContext.Provider>;
}
