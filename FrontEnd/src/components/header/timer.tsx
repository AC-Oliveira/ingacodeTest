import React, { useContext } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import GlobalContext from '../../context/GlobalContext';

interface ITimerProps extends React.HTMLAttributes<HTMLDivElement> {
  offsetTimestamp: Date;
}

export function Timer({ offsetTimestamp, ...props }: ITimerProps): JSX.Element {
  const { setCounting } = useContext<any>(GlobalContext);

  // console.log(timeToday);

  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({
    offsetTimestamp,
  });

  return (
    <div {...props}>
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
        className="btn btn-link"
      >
        {isRunning ? <AiFillPauseCircle color="#fafafa" size={50} /> : <AiFillPlayCircle size={50} color="#fafafa" />}
      </button>
    </div>
  );
}
