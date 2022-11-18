import { useContext, useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';
import userServices from '../../services/user';
import { ICollaborator } from '../../services';
import CollaboratorModalContext from '../../context/CollaboratorModalContext';

interface ICollaborators {
  Id: string;
  Name: string;
}

interface IModalBodyProps {
  selectedCollaborators: string[] | undefined;
  TaskId: string;
}

export function ModalBody({ selectedCollaborators, TaskId }: IModalBodyProps): JSX.Element {
  const { setCollaboratorName, setCollaboratorsList, collaboratorsList, addCollaboratorsList, setAddCollaboratorsList } =
    useContext<any>(CollaboratorModalContext);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setCollaboratorName(event.target.value);
    const collaborators: ICollaborators[] | { message: string } = await userServices.searchCollaborators(event.target.value);
    if (Array.isArray(collaborators)) {
      const filteredCollaborators = collaborators.filter((collaborator) => !selectedCollaborators?.includes(collaborator.Name));
      setCollaboratorsList(filteredCollaborators);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [collaboratorsList, addCollaboratorsList]);

  return (
    <div className="modal-body" style={{ minHeight: '350px' }}>
      <DebounceInput
        id={`collaborators-input${TaskId}`}
        className={`form-control shadow-none ${!!collaboratorsList?.length && 'active-search'}`}
        onChange={onChange}
        minLength={1}
        debounceTimeout={1000}
      />
      <ul className={`list-group ${!!collaboratorsList?.length && 'active-search'}`}>
        {collaboratorsList?.map((collaborator: ICollaborator, index: number) => {
          const collaboratorSelected = addCollaboratorsList?.some((e: ICollaborator) => collaboratorsList?.indexOf(e) === index);
          return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li
              key={collaborator.Id}
              className={`list-group-item py-2 text-center ${collaboratorSelected && 'active'} add-collaborator`}
              onClick={() => {
                if (!collaboratorSelected) {
                  setAddCollaboratorsList((curr: ICollaborator[]) => [...curr, collaborator]);
                } else {
                  setAddCollaboratorsList((curr: ICollaborator[]) => curr.filter((id) => id !== collaborator));
                }
              }}
            >
              {collaborator.Name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
