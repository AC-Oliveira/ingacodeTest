import { useContext, useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CustomModal } from '../components/CustomModal';
import { ProjectRegister } from '../components/ProjectRegister';
import { TaskListItem } from '../components/TaskListItem';
import { TaskRegister } from '../components/TaskRegister';
import GlobalContext from '../context/GlobalContext';
import services, { IProject } from '../services';

export default function Manage(): JSX.Element {
  const { setShow, setMessage } = useContext<any>(GlobalContext);
  const [newProject, setNewProject] = useState(false);
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [projectFocus, setProjectFocus] = useState(2);
  const [newTask, setNewTask] = useState(false);

  useEffect(() => {
    const getProjects = async (): Promise<void> => {
      const projects = await services.getProjects();
      setProjectList(projects);
    };
    getProjects();
  }, []);

  const calcDays = (date: Date): number => {
    const today = String(new Date());
    const dateString = String(new Date(date));

    const msDiff: number = Date.parse(today) - Date.parse(dateString);
    const diff = Math.floor(msDiff / (1000 * 3600 * 24));
    return diff;
  };

  return (
    <>
      <CustomModal setNewProject={setNewProject} setNewTask={setNewTask} />
      <div className="content px-2">
        <div className="h-100 pt-4 mb-2">
          <h1 className="text-center fw-bold text-blue-600 mb-4">Gerenciar Projetos</h1>
        </div>
        {!newProject && !newTask && (
          <div className="row my-2 mx-auto" style={{ maxWidth: '1400px' }}>
            <div className="border border-gray-200 rounded col col-12 col-sm-4 bg-white">
              <div className="d-flex align-items-center">
                <h3 className="text-blue-600 text-center fw-bold mt-2 flex-grow-1 ms-4">Projetos</h3>
                <button className="btn btn-link" type="button" onClick={() => setNewProject(true)}>
                  <BsPlusLg size={30} className="flex-grow-2 text-danger mx-2" />
                </button>
              </div>
              <hr className="mt-1" />
              <div>
                <div className="d-flex flex-column justify-content-between align-items-center gap-3">
                  {projectList?.map((project, index) => (
                    <button type="button" onClick={() => setProjectFocus(index)} className="btn btn-link text-decoration-none">
                      <h4 className={`${projectFocus === index ? 'text-danger' : 'text-blue-600'} fw-semibold`}>{project?.Name}</h4>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <hr />
                <Link to="/dashboard" className="text-decoration-none">
                  <h3 className="text-danger text-center fw-bold mb-auto">Dashboard</h3>
                </Link>
              </div>
            </div>
            <div className="col col-1" />
            <div className="border col col-12 col-sm-7 rounded bg-white p-2">
              <div className="d-flex align-items-center">
                <h3 className="text-blue-600 text-center fw-bold mt-2 flex-grow-1 ms-4">Tasks</h3>
                <button className="btn btn-link" type="button" onClick={() => setNewTask(true)}>
                  <BsPlusLg size={30} className="flex-grow-2 text-danger mx-2" />
                </button>
              </div>
              {!!projectList[projectFocus]?.Tasks?.length && (
                <div className="list-group overflow-hidden mt-3">
                  {projectList[projectFocus]?.Tasks?.map((task, index) => {
                    const findCollaborators = projectList[projectFocus]?.Tasks[index]?.TimeTrackers?.map((timeTracker) => timeTracker?.Collaborator);

                    const collaborators = findCollaborators?.filter(
                      (collaborator, idx) => findCollaborators?.findIndex((c) => c.Name === collaborator.Name) === idx
                    );
                    return (
                      <TaskListItem
                        taskId={task.Id}
                        description={task.Description}
                        collaborators={collaborators}
                        projectId={projectList[projectFocus]?.Id}
                        taskName={task.Name}
                        taskStart={calcDays(task.CreatedAt)}
                      />
                    );
                  })}
                </div>
              )}
              {!projectList[projectFocus]?.Tasks?.length && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <h4 className="text-danger text-center fw-semibold mt-2">Nenhuma task cadastrada</h4>
                </div>
              )}
            </div>
          </div>
        )}
        {newProject && <ProjectRegister setMessage={setMessage} setShow={setShow} setNewProject={setNewProject} />}
        {newTask && <TaskRegister setMessage={setMessage} setShow={setShow} setNewTask={setNewTask} ProjectId={projectList[projectFocus].Id} />}
      </div>
    </>
  );
}
