import { useContext, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { CollaboratorModal } from './CollaboratorModal';
import services, { ICollaborator } from '../services';
import GlobalContext from '../context/GlobalContext';

interface ITaskListItemProps {
  description: string;
  collaborators?: ICollaborator[];
  taskName: string;
  taskStart: number;
  projectId: string;
  taskId: string;
}

export function TaskListItem({
  description: defaultDescription,
  collaborators,
  taskName,
  taskStart,
  projectId,
  taskId,
}: ITaskListItemProps): JSX.Element {
  const { setMessage, setShow } = useContext<any>(GlobalContext);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(defaultDescription);
  const [collaboratorsRemoved, setCollaboratorsRemoved] = useState<ICollaborator[]>([]);
  const removedCollaborators: ICollaborator[] | undefined = collaboratorsRemoved?.filter((cr) => collaborators?.find((c) => c.Id === cr.Id));
  // console.log(collaborators);

  return (
    <div className="list-group-item list-group-item-action bg-gray-100" aria-current="true">
      <div className="d-flex flex-column  flex-md-row w-100 justify-content-between bg-danger p-2">
        <h5 className="mb-1 text-white">{taskName}</h5>
        <small className="text-white">{`${taskStart} dias atras`}</small>
      </div>
      <div className="p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="text-blue-600 fw-semibold">Descrição:</h6>
          <div>
            <button type="button" className="btn btn-link text-blue-600">
              <FaTrash size={18} />
            </button>
            <button type="button" onClick={() => setIsEditing(true)} className="btn btn-link text-blue-600">
              <FaEdit size={18} />
            </button>
          </div>
        </div>
        {!isEditing && <p className="mb-1">{description}</p>}
        {isEditing && (
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
              <button className="col col-6 btn btn-primary my-2" type="button" style={{ width: '200px' }}>
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
        )}
      </div>
      <div className="p-2">
        <div className="d-flex align-items-center mb-2">
          {!!collaborators?.length ? (
            <h6 className="text-blue-600 fw-semibold mb-0 flex-grow-1">Colaboradores:</h6>
          ) : (
            <small className="flex-grow-1">Nenhum colaborador foi adcionado a task</small>
          )}
          <CollaboratorModal TaskId={taskId} ProjectId={projectId} collaborators={collaborators?.map((e) => e.Name)} />
          {/* <button className="rounded-circle btn btn-link bg-white ms-auto shadow-none" type="button">
            <BsFillPersonPlusFill size={18} />
          </button> */}
        </div>
        {!!collaborators?.length && (
          <ul className="list-group align-items-center">
            {collaborators?.map((collaborator, index) => (
              <li className="list-group-item w-100 w-sm-50 text-center d-flex" style={{ maxWidth: '450px' }}>
                <p className="ms-4 my-1 text-center flex-grow-2 w-100">{collaborator.Name}</p>
                {!collaboratorsRemoved.some((c) => c === collaborators[index]) && (
                  <button
                    onClick={() => setCollaboratorsRemoved((curr) => [...curr, collaborators[index]])}
                    type="button"
                    className="px-3 flex-grow-1 text-danger my-auto btn btn-link"
                  >
                    <AiOutlineMinusCircle size={18} />
                  </button>
                )}
                {collaboratorsRemoved.some((c) => c === collaborators[index]) && (
                  <button
                    onClick={() => setCollaboratorsRemoved((curr) => curr.filter((c) => c !== collaborators[index]))}
                    type="button"
                    className="px-3 flex-grow-1 text-success my-auto btn btn-link"
                  >
                    <AiOutlinePlusCircle size={18} />
                  </button>
                )}
              </li>
            ))}
            {!!removedCollaborators.length && (
              <>
                <span className="my-3">{removedCollaborators.map((e) => e.Name).join(', ')}</span>
                <button
                  onClick={async () => {
                    console.log(removedCollaborators, taskId);
                    const message = await services.deleteTimeTrackerByTaskAndCollaborator(
                      removedCollaborators.map((e) => ({ Name: e.Name, CollaboratorId: e.Id })),
                      taskId
                    );
                    setMessage(message);
                    setShow(true);
                  }}
                  type="button"
                  className="btn bg-gray-700 text-white"
                >
                  Remover Colaborador
                </button>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
