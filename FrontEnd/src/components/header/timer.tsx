import React, { useContext } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import GlobalContext from '../../context/GlobalContext';

export function Timer({ offsetTimestamp }: { offsetTimestamp: Date }): JSX.Element {
  const { setCounting } = useContext<any>(GlobalContext);
  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({
    offsetTimestamp,
  });

  return (
    <div className="d-flex justify-content-evenly mx-auto border border-danger rounded bg-danger">
      <div className="timer d-flex align-items-center p-2">
        <span>{`${hours < 10 ? '0' : ''}${hours}`}</span>-<span>{`${minutes < 10 ? '0' : ''}${minutes}`}</span>-
        <span>{`${seconds < 10 ? '0' : ''}${seconds}`}</span>
      </div>
      <button
        type="button"
        onClick={() => {
          if (isRunning) {
            pause();
            setCounting(false);
          } else {
            start();
            setCounting(true);
          }
        }}
        className="ms-3 btn btn-link"
      >
        {isRunning ? <AiFillPauseCircle color="#fafafa" size={50} /> : <AiFillPlayCircle size={50} color="#fafafa" />}
      </button>
    </div>
  );
}
