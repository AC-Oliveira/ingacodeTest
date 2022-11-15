import { Dispatch, useContext, useState } from 'react';
import taskServices from '../../services/task';

import GlobalContext from '../../context/GlobalContext';

interface ITaskDescriptionProps {
  defaultDescription: string;
  taskId: string;
  taskName: string;
  isEditing: boolean;
  setIsEditing: Dispatch<React.SetStateAction<boolean>>;
}

export function TaskDescription({ defaultDescription, taskId, taskName, isEditing, setIsEditing }: ITaskDescriptionProps): JSX.Element {
  const { setMessage, setShow } = useContext<any>(GlobalContext);

  const [description, setDescription] = useState(defaultDescription);
  if (!isEditing) return <p className="mb-1">{description}</p>;
  return (
    <div className="form-floating d-flex flex-column">
      <textarea
        value={description}
        style={{ minHeight: '300px' }}
        onChange={({ target }) => setDescription(target.value)}
        className="form-control shadow-none"
        placeholder="Leave a comment here"
        id="floatingTextarea2"
      />
      <div className="row justify-content-center gap-sm-3">
        <button
          onClick={async () => {
            const message = await taskServices.updateTask(taskId, description, taskName);
            setMessage(message);
            setShow(true);
          }}
          className="col col-6 btn btn-primary my-2"
          type="button"
          style={{ width: '200px' }}
        >
          Salvar
        </button>
        <button
          onClick={() => {
            setIsEditing(false);
            setDescription(defaultDescription);
          }}
          className="col col-6 btn btn-secondary my-2"
          type="button"
          style={{ width: '200px' }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
