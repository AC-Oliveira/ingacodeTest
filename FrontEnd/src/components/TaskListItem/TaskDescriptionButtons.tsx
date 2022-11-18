import React, { Dispatch, SetStateAction, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ManageContext from '../../context/ManageContext';
import { IManageContext } from '../../pages/Manage';

interface ITaskDescriptionButtonsProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  Id: string;
}

export function TaskDescriptionButtons({ setIsEditing, Id }: ITaskDescriptionButtonsProps): JSX.Element {
  const { setShowTaskModal, setTaskModalMessage, setTask, taskList }: IManageContext = useContext<any>(ManageContext);

  return (
    <div className="d-flex justify-content-between align-items-center">
      <h6 className="text-blue-600 fw-semibold">Descrição:</h6>
      <div>
        <button
          onClick={() => {
            const currentTask: any = taskList.get(Id);

            setTask(currentTask);
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
  );
}
