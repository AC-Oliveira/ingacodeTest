import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ManageContext from '../../context/ManageContext';
import { IManageContext } from '../../pages/Manage';
import { IProject } from '../../services';
import taskService from '../../services/task';
import { TaskModal } from './TaskModal';

interface ITaskDescriptionButtonsProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  Id: string;
}

export function TaskDescriptionButtons({ setIsEditing, Id }: ITaskDescriptionButtonsProps): JSX.Element {
  const { setProject, projectList, setProjectList }: IManageContext = useContext<any>(ManageContext);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskModalMessage, setTaskModalMessage] = useState('');
  const [close, setClose] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);

  const deleteTask = async (): Promise<void> => {
    const data = await taskService.deleteTask(Id);

    setTaskModalMessage(data.message);
    setClose(true);

    if (data.Project) setCurrentProject(data.Project);
  };

  const setProjectState = (): void => {
    setProject(currentProject);

    const newProjectList = [...projectList];
    const index = newProjectList.findIndex((project: IProject) => project.Id === currentProject.Id);
    newProjectList[index] = currentProject;

    setProjectList(newProjectList);
  };
  return (
    <>
      <TaskModal
        setShowTaskModal={setShowTaskModal}
        close={close}
        show={showTaskModal}
        message={taskModalMessage}
        deleteTask={deleteTask}
        setTasks={setProjectState}
      />
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="text-blue-600 fw-semibold">Descrição:</h6>
        <div>
          <button
            onClick={() => {
              setTaskModalMessage('Deseja excluir essa tarefa?');
              setShowTaskModal(true);
            }}
            type="button"
            className="btn btn-link text-blue-600"
          >
            <FaTrash size={18} />
          </button>
          <button type="button" onClick={() => setIsEditing(true)} className="btn btn-link text-blue-600">
            <FaEdit size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
