import { useContext } from 'react';
import ManageContext from '../../context/ManageContext';
import { IManageContext } from '../../pages/Manage';

export function ManageProjectsList(): JSX.Element {
  const { setProject, project, setTaskList, projectList }: IManageContext = useContext<any>(ManageContext);
  return (
    <div>
      <div className="d-flex flex-column justify-content-between align-items-center gap-3">
        {projectList?.map((prj) => (
          <button
            key={prj?.Id}
            type="button"
            onClick={() => {
              setProject(prj);
              setTaskList(prj.Tasks);
            }}
            className="btn btn-link text-decoration-none"
          >
            <h4 key={prj?.Id} className={`${project?.Id === prj.Id ? 'text-danger' : 'text-blue-600'} fw-semibold mb-0`}>
              {prj?.Name}
            </h4>
          </button>
        ))}
      </div>
    </div>
  );
}
