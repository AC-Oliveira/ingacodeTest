import React, { useContext, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import GlobalContext from '../../context/GlobalContext';

export function TaskTimer({ offsetTimestamp }: { offsetTimestamp: Date }): JSX.Element {
  const { counting } = useContext<any>(GlobalContext);
  const { minutes, hours, start, pause } = useStopwatch({
    offsetTimestamp,
  });

  useEffect(() => {
    if (counting) {
      start();
    } else {
      pause();
    }
  }, [counting]);

  return (
    <div className="d-flex justify-content-evenly mx-auto border rounded-pill bg-white">
      <div style={{ fontFamily: 'Orbitron' }} className="d-flex align-items-center text-danger">
        <span>{`${hours < 10 ? '0' : ''}${hours}`}</span>:<span>{`${minutes < 10 ? '0' : ''}${minutes}`}</span>
      </div>
    </div>
  );
}
