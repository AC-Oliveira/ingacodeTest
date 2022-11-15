import React, { Dispatch, SetStateAction, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import taskService from '../../services/task';
import { TaskModal } from './TaskModal';

interface ITaskDescriptionButtonsProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  Id: string;
}

export function TaskDescriptionButtons({ setIsEditing, Id }: ITaskDescriptionButtonsProps): JSX.Element {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [error, setError] = useState(false);
  const [taskModalMessage, setTaskModalMessage] = useState('');
  const [close, setClose] = useState(false);

  const deleteTask = async (): Promise<void> => {
    const data = await taskService.deleteTask(Id);
    setTaskModalMessage(data.message);
    if (data.error) setError(true);
    setClose(true);
  };
  return (
    <>
      <TaskModal error={error} close={close} show={showTaskModal} message={taskModalMessage} cb={deleteTask} />
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
