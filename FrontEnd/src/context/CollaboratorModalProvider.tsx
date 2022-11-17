import { ReactNode, useMemo, useState } from 'react';
import CollaboratorModalContext from './CollaboratorModalContext';

export function CollaboratorModalProvider({ children }: { children: ReactNode }): JSX.Element {
  const [collaboratorName, setCollaboratorName] = useState('');
  const [addCollaboratorsList, setAddCollaboratorsList] = useState([]);
  const [collaboratorsList, setCollaboratorsList] = useState([]);
  const contextProviderValue = useMemo(
    () => ({
      collaboratorName,
      setCollaboratorName,
      addCollaboratorsList,
      setAddCollaboratorsList,
      collaboratorsList,
      setCollaboratorsList,
    }),
    [collaboratorName, collaboratorsList, addCollaboratorsList]
  );

  return <CollaboratorModalContext.Provider value={contextProviderValue}>{children}</CollaboratorModalContext.Provider>;
}
