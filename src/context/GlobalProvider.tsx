import { ReactNode, useEffect, useMemo, useState } from 'react';
import GlobalContext from './GlobalContext';

export function GlobalProvider({ children }: { children: ReactNode }): JSX.Element {
  const [counting, setCounting] = useState(false);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const contextProviderValue = useMemo(
    () => ({
      counting,
      setCounting,
      message,
      setMessage,
      show,
      setShow,
    }),
    [counting, message, show]
  );

  return <GlobalContext.Provider value={contextProviderValue}>{children}</GlobalContext.Provider>;
}
