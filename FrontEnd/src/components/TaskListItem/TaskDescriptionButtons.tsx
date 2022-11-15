import React, { Dispatch, SetStateAction, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import GlobalContext from '../../context/GlobalContext';

interface ITaskDescriptionButtonsProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export function TaskDescriptionButtons({ setIsEditing }: ITaskDescriptionButtonsProps): JSX.Element {
  const { setMessage, setShow, setChoice } = useContext<any>(GlobalContext);
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h6 className="text-blue-600 fw-semibold">Descrição:</h6>
      <div>
        <button
          onClick={() => {
            setMessage('Deseja excluir essa tarefa?');
            setChoice(true);
            setShow(true);
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
