import React, { useContext, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import GlobalContext from '../context/GlobalContext';

export function ProjectTimer({ offsetTimestamp }: { offsetTimestamp: Date }): JSX.Element {
  const { counting } = useContext<any>(GlobalContext);
  const { seconds, minutes, hours, days, start, pause } = useStopwatch({
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
    <div className="d-flex justify-content-center justify-content-sm-start">
      <div
        className="timer project-timer d-flex align-items-center rounded p-2 bg-gray-200 justify-content-center mt-2 mt-sm-0"
        style={{ minWidth: '310px' }}
      >
        <div style={{ minWidth: '60px' }} className="bg-blue-600 p-1 rounded day">
          <span>{`${days < 10 ? '0' : ''}${days}`}</span>
        </div>
        <span className="text-danger mt-2 mx-1">:</span>
        <div style={{ minWidth: '60px' }} className="bg-blue-600 p-1 rounded hour">
          <span>{`${hours < 10 ? '0' : ''}${hours}`}</span>
        </div>
        <span className="text-danger mt-2 mx-1">:</span>
        <div style={{ minWidth: '60px' }} className="bg-blue-600 p-1 rounded minute">
          <span>{`${minutes < 10 ? '0' : ''}${minutes}`}</span>
        </div>
      </div>{' '}
    </div>
  );
}
