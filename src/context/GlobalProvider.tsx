import { ReactNode, useState } from 'react';
import GlobalContext from './GlobalContext';

export function GlobalProvider({ children }: { children: ReactNode }): JSX.Element {
  const [counting, setCounting] = useState(false);
  const values = {
    counting,
    setCounting,
  };

  return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>;
}
