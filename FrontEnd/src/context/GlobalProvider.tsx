import { ReactNode, useEffect, useMemo, useState } from 'react';
import timetrackerService from '../services/timetracker';
import GlobalContext from './GlobalContext';

export function GlobalProvider({ children }: { children: ReactNode }): JSX.Element {
  const [counting, setCounting] = useState(false);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const contextProviderValue = useMemo(
    () => ({
      counting,
      setCounting,
      message,
      setMessage,
      show,
      setShow,
      error,
      setError,
      activeTask,
      setActiveTask,
      activeProject,
      setActiveProject,
    }),
    [counting, message, show, error, activeTask, activeProject]
  );

  return <GlobalContext.Provider value={contextProviderValue}>{children}</GlobalContext.Provider>;
}
