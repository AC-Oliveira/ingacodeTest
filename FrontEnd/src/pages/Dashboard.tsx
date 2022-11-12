import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DashboardProjectComponent } from '../components/DashboardProjectComponent';
import { DashboardTaskComponent } from '../components/DashboardTaskComponent';
import { ProjectTimer } from '../components/ProjectTimer';
import GlobalContext from '../context/GlobalContext';

export function Dashboard(): JSX.Element {
  const { counting } = useContext<any>(GlobalContext);
  const today: any = new Date();
  const passedTime = new Date(Date.parse(today) + 7541312147);

  return (
    <div className="content d-flex flex-column align-items-center">
      <div className="mx-2 w-75">
        <h1 className="text-blue-600 text-center fw-bold mt-3">Dashboard</h1>
        <p className="fw-bold text-center">
          Task Status: <span className={`${counting ? 'text-success' : 'text-danger'} `}>{counting ? 'Iniciada' : 'Pausada'}</span>
        </p>
      </div>
      <div className="container border border-gray-200 rounded bg-white p-2 p-lg-4 mt-2 overflow-hidden W-75" style={{ maxWidth: '1400px' }}>
        <DashboardProjectComponent project="Task Tracker" />
        <DashboardTaskComponent task="Dashboard Design" />
        <div className="row p-3 align-items-center justify-content-start">
          <div className="col-12 col-sm-6 col-md-6">
            <p className="text-danger mb-0 fs-5 fw-semibold text-center text-sm-end justify">Descrição:</p>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <p className="text-gray-700 ms-3 ms-lg-0 mb-0 fs-6 text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum!
            </p>
          </div>
        </div>
        <div className="row p-3 align-items-center justify-content-start">
          <div className="col-12 col-sm-6 col-md-6">
            <p className="text-danger mb-0 fs-5 fw-semibold text-center text-sm-end">Colaboradores:</p>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <div
              className="d-flex gap-2 justify-content-center justify-content-sm-start mt-2 mt-sm-0"
              style={{ maxWidth: '634px', maxHeight: '50px' }}
            >
              {['Allan', 'João', 'Maria', 'Jack'].map((name) => {
                const initials = name.substring(0, 2).toUpperCase();
                const bg = `#${Math.floor(Math.random() * 16777215).toString(16)}`.replace('f', 'e');
                return (
                  <div
                    className="fw-bold rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: bg.length === 7 ? bg : bg + 0,
                    }}
                  >
                    <span className="mb-0 text-white d-inline-block">{initials}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="row p-3 align-items-center justify-content-start">
          <div className="col-12 col-sm-6 col-md-6">
            <p className="text-danger mb-0 fs-5 fw-semibold text-center text-sm-end justify">Timezone:</p>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <p className="text-gray-700 ms-3 ms-lg-0 mb-0 fs-6 fw-semibold text-center text-sm-start">
              {Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_', ' ')}
            </p>
          </div>
        </div>
        <div className="row p-3 align-items-center justify-content-start">
          <div className="col-12 col-md-6">
            <p className="text-danger mb-0 fs-5 fw-semibold text-center text-sm-end justify">Tempo de Projeto:</p>
          </div>
          <div className="col-12 col-md-6">
            <ProjectTimer offsetTimestamp={passedTime} />
          </div>
        </div>
      </div>
      <Link to="/manage">
        <button className="btn btn-lg btn-danger border- my-3" type="button">
          Gerenciar Projetos
        </button>
      </Link>
    </div>
  );
}
