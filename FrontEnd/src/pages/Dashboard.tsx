import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardProjectComponent } from '../components/DashboardProjectComponent';
import { DashboardTaskComponent } from '../components/DashboardTaskComponent';
import { ProjectTimer } from '../components/ProjectTimer';
import timetrackerServices from '../services/timetracker';
import projectServices from '../services/project';
import GlobalContext from '../context/GlobalContext';

interface ITT {
  TimeZoneId: string;
  Collaborator: {
    Id: string;
    Name: string;
  };
}

export function Dashboard(): JSX.Element {
  const { activeTask, setActiveTask, activeProject, setActiveProject, counting } = useContext<any>(GlobalContext);
  const [collaborators, setCollaborators] = useState<any>([]);
  useEffect(() => {
    const findActiveTask = async (): Promise<void> => {
      if (!activeTask) {
        const data = await timetrackerServices.getActiveOrLastTimeTrackerByCollaborator();
        if (data.TaskId) setActiveTask(data.TaskId);
      }
    };
    const findActiveProject = async (): Promise<void> => {
      if (!activeProject && activeTask) {
        const data: any = await projectServices.findActiveProject(activeTask);

        if (data) {
          setActiveProject(data);
          const collaboratorsList = data?.Tasks[0]?.TimeTrackers?.map((tt: ITT) => ({
            TimezoneId: tt?.TimeZoneId,
            Name: tt?.Collaborator?.Name,
            Id: tt?.Collaborator?.Id,
          }));

          const ids = collaboratorsList?.map((c: any) => c.Id);
          const filtered = collaboratorsList.filter(({ Id }: any, index: number) => !ids.includes(Id, index + 1));

          setCollaborators(filtered);
        }
      }
    };
    findActiveTask();
    findActiveProject();
  }, [activeTask, activeProject]);

  const today: any = new Date();
  const passedTime = new Date(Date.parse(today) + 7541312147);
  if (!activeProject) {
    return (
      <div className="content d-flex flex-column align-items-center justify-content-center h-100">
        <div
          className="d-flex flex-column justify-content-center align-items-center my-0 container border border-gray-200 rounded bg-white mt-2"
          style={{ maxWidth: '1400px', minHeight: '500px' }}
        >
          <h1 className="text-center text-blue-600">Nenhum projeto encontrado!</h1>
          <Link to="/manage">
            <button className="btn btn-lg btn-danger border- my-3" type="button">
              Iniciar Projetos
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="content d-flex flex-column align-items-center">
      <div className="mx-2 w-75">
        <h1 className="text-blue-600 text-center fw-bold mt-3">Dashboard</h1>
        <p className="fw-bold text-center">
          Task Status: <span className={`${counting ? 'text-success' : 'text-danger'} `}>{counting ? 'Iniciada' : 'Pausada'}</span>
        </p>
      </div>

      <div className="container border border-gray-200 rounded bg-white p-2 p-lg-4 mt-2 overflow-hidden w-75" style={{ maxWidth: '1400px' }}>
        <DashboardProjectComponent project={activeProject.Name} />
        <DashboardTaskComponent task={activeProject.Tasks[0].Name} />
        <div className="row p-3 align-items-center justify-content-start">
          <div className="col-12 col-sm-6 col-md-6">
            <p className="text-danger mb-0 fs-5 fw-semibold text-center text-sm-end justify">Descrição:</p>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <p className="text-gray-700 ms-3 ms-lg-0 mb-0 fs-6 text-start">
              {activeProject.Tasks[0].Description ? activeProject.Tasks[0].Description : 'Nenhuma descrição encontrada!'}
            </p>
          </div>
        </div>
        <div className="row p-3 align-items-center justify-content-start">
          <div className="col-12 col-sm-6 col-md-6">
            <p className="text-danger mb-0 fs-5 fw-semibold text-center text-sm-end">Colaboradores:</p>
          </div>

          <div className="col-12 col-sm-6 col-md-6">
            <div className="d-flex gap-2 justify-content-center justify-content-sm-start mt-2 mt-sm-0" style={{ maxWidth: '634px', maxHeight: '50px' }}>
              {collaborators.map(({ Name, Id }: any) => {
                const initials = Name.substring(0, 2).toUpperCase();
                const bg = `#${Math.floor(Math.random() * 16777215).toString(16)}`.replace('f', 'e');
                return (
                  <div
                    key={Id}
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
              {collaborators.find((c: any) => c.Id === activeProject.userId)?.TimezoneId}
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
