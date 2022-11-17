import { useContext, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { ICollaborator } from '../../services';
import timetrackerServices from '../../services/timetracker';
import GlobalContext from '../../context/GlobalContext';

interface ICollaboratorsListProps {
  collaborators: ICollaborator[];
  taskId: string;
}

export function CollaboratorsList({ collaborators, taskId }: ICollaboratorsListProps): JSX.Element {
  const { setMessage, setShow } = useContext<any>(GlobalContext);

  const [collaboratorsRemoved, setCollaboratorsRemoved] = useState<ICollaborator[]>([]);

  const removedCollaborators: ICollaborator[] | undefined = collaboratorsRemoved?.filter((cr) => collaborators?.find((c) => c.Id === cr.Id));

  return (
    <ul className="list-group align-items-center">
      {collaborators?.map((collaborator, index) => (
        <li key={collaborator.Id} className="list-group-item w-100 w-sm-50 text-center d-flex" style={{ maxWidth: '450px' }}>
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
              const message = await timetrackerServices.deleteTimeTrackerByTaskAndCollaborator(
                removedCollaborators.map((e) => ({ Name: e.Name, CollaboratorId: e.Id })),
                taskId
              );
              setMessage(message);
              setShow(true);
            }}
            type="button"
            className="btn bg-gray-700 text-white"
          >
            Remover Colaborador(es)
          </button>
        </>
      )}
    </ul>
  );
}
