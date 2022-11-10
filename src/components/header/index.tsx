import { useLocation } from 'react-router-dom';
import { Timer } from './timer';

export function Header(): JSX.Element {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10600);
  const { pathname } = useLocation();

  return (
    <nav className="min-vw-100 container container-sm navbar navbar-expand-lg navbar-light bg-white d-flex align-items-center border-bottom justify-content-between">
      <div className="d-flex align-items-center gap-3 mx-auto mb-2 mb-sm-0">
        <div className="logo d-flex justify-content-ceter align-items-center ms-3 bg-gray-100 rounded-circle">
          <img src="logo.png" alt="Inga code logo" />
        </div>
        <h4 className="mb-0 NavTitle">TaskTracker</h4>
      </div>
      {pathname !== '/' && <Timer offsetTimestamp={time} />}
    </nav>
  );
}
