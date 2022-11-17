import { useContext } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { TaskListItem } from './TaskListItem';
import ManageContext from '../context/ManageContext';
import { IManageContext } from '../pages/Manage';
import { ManageProjectsList } from './TaskListItem/ManageProjectsList';

export function ManageMenu(): JSX.Element {
  const { setNewProject, setNewTask, project }: IManageContext = useContext<any>(ManageContext);
  return (
    <div className="row my-2 mx-auto" style={{ maxWidth: '1400px' }}>
      <div className="border border-gray-200 rounded col col-12 col-md-4 bg-white mb-3 mb-md-0">
        <div className="d-flex align-items-center">
          <h3 className="text-blue-600 text-center fw-bold mt-2 flex-grow-1 ms-4">Projetos</h3>
          <button className="btn btn-link" type="button" onClick={() => setNewProject(true)}>
            <BsPlusLg size={30} className="flex-grow-2 text-danger mx-2" />
          </button>
        </div>
        <hr className="mt-1" />
        <ManageProjectsList />
        <div>
          <hr />
          <Link to="/dashboard" className="text-decoration-none">
            <h3 className="text-danger text-center fw-bold mb-3">Dashboard</h3>
          </Link>
        </div>
      </div>
      <div className="col col-1" />

      <div className="border col col-12 col-md-7 rounded bg-white p-2">
        <div className="d-flex align-items-center">
          <h3 className="text-blue-600 text-center fw-bold mt-2 flex-grow-1 ms-4">Tasks</h3>
          <button className="btn btn-link" type="button" onClick={() => setNewTask(true)}>
            <BsPlusLg size={30} className="flex-grow-2 text-danger mx-2" />
          </button>
        </div>

        {!!project?.Tasks?.length && (
          <div className="list-group overflow-hidden mt-3">
            {project?.Tasks?.map((task) => {
              return <TaskListItem key={task.Id} task={task} />;
            })}
          </div>
        )}
        {!project?.Tasks?.length && (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h4 className="text-danger text-center fw-semibold mt-2">Nenhuma task cadastrada</h4>
          </div>
        )}
      </div>
    </div>
  );
}
