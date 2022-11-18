import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import timetrackerService from '../../services/timetracker';
import { Timer } from './timer';

export function Header(): JSX.Element {
  const { pathname } = useLocation();
  const [ms, setMs] = useState(0);
  // const [timeToday, setTimeToday] = useState<Date>(new Date());

  useEffect(() => {
    const getTodayTime = async (): Promise<void> => {
      const data: any = await timetrackerService.getTodayTotalTime();
      // const today = new Date();
      // today.setMinutes(data.time.min);
      if (data?.time?.ms) {
        // console.log(today.getHours(), data.time.h);
        // today.setMilliseconds(today.getMilliseconds() + data.time.ms);
        // console.log('today', today);
        // // today.setHours(today.getHours() + data.time.h);
        setMs(data.time.ms);
      }
    };
    getTodayTime();
  }, [ms]);

  const timeToday = new Date();
  timeToday.setMilliseconds(timeToday.getMilliseconds() + ms);
  console.log('ms', ms, 'timeToday', timeToday);

  return (
    <nav className="min-vw-100 container container-sm navbar navbar-expand-lg navbar-light bg-white border-bottom mx-0">
      <div className="row w-100 mx-auto" style={{ maxWidth: '1400px' }}>
        <div className="d-flex align-items-center justify-content-center gap-2 mb-2 mb-sm-0 col-12 col-md-3">
          <div className="logo d-flex justify-content-ceter align-items-center">
            <img src="logo.png" alt="Inga code logo" />
          </div>
          <h4 className="mb-0 NavTitle">TaskTracker</h4>
        </div>
        {pathname !== '/' && (
          <div className={`col-12 col-md-9 d-flex justify-content-center align-items-center'`}>
            <Timer
              offsetTimestamp={timeToday}
              style={{ minWidth: '320px', maxWidth: '320px' }}
              className="d-flex justify-content-evenly border border-danger rounded bg-danger ms-md-auto"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
