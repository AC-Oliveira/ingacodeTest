import * as bootstrap from 'bootstrap';
import { useContext, useEffect, useRef } from 'react';
import { AiFillWarning } from 'react-icons/ai';
import ManageContext from '../../context/ManageContext';
import { IManageContext } from '../../pages/Manage';
import taskService from '../../services/task';
import projectService from '../../services/project';
import { IProject } from '../../services';
import GlobalContext from '../../context/GlobalContext';

export function TaskModal(): JSX.Element {
  const modalRef: any = useRef();
  const {
    showTaskModal: show,
    setShowTaskModal,
    taskModalMessage: message,
    setTaskModalMessage,
    close,
    setClose,
    task,
    project,
    setProject,
    projectList,
    setProjectList,
    taskList,
    deleteProject,
    setDeleteProject,
    setTaskList,
  }: IManageContext = useContext<any>(ManageContext);
  const { setActiveProject, setActiveTask } = useContext<any>(GlobalContext);

  const showModal = (): void => {
    const modal: any = modalRef.current;
    const bsModal = new bootstrap.Modal(modal, {
      backdrop: 'static',
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = (): void => {
    const modal: any = modalRef.current;
    const bsModal = bootstrap.Modal.getInstance(modal);
    bsModal?.hide();
  };

  useEffect(() => {
    if (show) {
      showModal();
    } else {
      hideModal();
    }
  }, [show]);

  return (
    <div className="modal fade" ref={modalRef} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header justify-content-start align-items-center gap-2 text-danger">
            <AiFillWarning size={24} />
            <h5 className="modal-title fw-semibold" id="staticBackdropLabel">
              Alerta!
            </h5>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                if (deleteProject) {
                  const currProjectList = new Map(projectList);
                  currProjectList.delete(project.Id);
                  setProjectList(currProjectList);
                  setProject(Array.from(currProjectList.values())[0]);
                }
                setShowTaskModal(false);
                setClose(false);
                setTaskModalMessage('');
                setDeleteProject(false);
              }}
            >
              {close ? 'Fechar' : 'Não'}
            </button>
            {!close && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={async () => {
                  if (!deleteProject) {
                    const data = await taskService.deleteTask(task.Id);
                    setTaskModalMessage(data.message);
                    setClose(true);
                    const currTaskList = new Map(taskList);
                    if (data.Project) {
                      currTaskList.delete(task.Id);
                      setTaskList(currTaskList);
                      setProject({ ...project, Tasks: Array.from(currTaskList.values()) });
                      const currProject = projectList.get(project.Id) as IProject;
                      setProjectList((curr) => curr.set(project.Id, { ...currProject, Tasks: Array.from(currTaskList.values()) }));
                    }
                  } else {
                    const data = await projectService.deleteProject(project.Id);
                    setTaskModalMessage(data.message);
                    setClose(true);
                  }
                  setActiveProject(null);
                  setActiveTask(null);
                }}
              >
                Sim
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
