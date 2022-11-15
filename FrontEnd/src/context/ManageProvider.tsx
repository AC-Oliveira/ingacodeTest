import { ReactNode, useMemo, useState } from 'react';
import ManageContext from './ManageContext';

export function ManageProvider({ children }: { children: ReactNode }): JSX.Element {
  const [newProject, setNewProject] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [project, setProject] = useState();
  const [taskList, setTaskList] = useState();

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
    }),
    [newProject, newTask, project, taskList]
  );

  return <ManageContext.Provider value={contextProviderValue}>{children}</ManageContext.Provider>;
}
