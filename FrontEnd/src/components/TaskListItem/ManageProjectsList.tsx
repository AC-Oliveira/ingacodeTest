import { useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import ManageContext from '../../context/ManageContext';
import { IManageContext } from '../../pages/Manage';
import { ITask } from '../../services';

export function ManageProjectsList(): JSX.Element {
  const { setNewProject, project, setProject, setTaskList, projectList, setEditProject }: IManageContext = useContext<any>(ManageContext);
  return (
    <div>
      <div className="d-flex flex-column justify-content-between align-items-center gap-3">
        {Array.from(projectList.values())?.map((prj) => (
          <div key={prj.Id} className="d-flex align-items-center w-100">
            <button
              type="button"
              className="btn bt-link shadow-none"
              onClick={() => {
                setProject(prj);
                setNewProject(true);
                setEditProject(true);
              }}
            >
              <FaEdit size={25} className={`mx-3 ${project?.Id === prj.Id ? 'text-danger' : 'text-blue-600'}`} />
            </button>
            <div className="w-100">
              <button
                key={prj?.Id}
                type="button"
                onClick={() => {
                  const TasksMap = new Map<string, ITask>();
                  prj.Tasks.forEach((task) => {
                    TasksMap.set(task.Id, task);
                  });
                  setProject(prj);
                  setTaskList(TasksMap);
                }}
                className="btn btn-link text-decoration-none text-start w-100"
              >
                <h4 key={prj?.Id} className={`${project?.Id === prj.Id ? 'text-danger' : 'text-blue-600'} fw-semibold mb-0 me-0 me-lg-5`}>
                  {prj?.Name}
                </h4>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
