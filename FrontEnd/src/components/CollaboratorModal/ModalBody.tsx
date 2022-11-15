import { Dispatch, SetStateAction, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import userServices from '../../services/user';
import { ICollaborator } from '../../services';

interface ICollaborators {
  Id: string;
  Name: string;
}

interface IModalBodyProps {
  setCollaboratorName: Dispatch<SetStateAction<string>>;
  addCollaboratorsList: ICollaborators[];
  setAddCollaboratorsList: Dispatch<SetStateAction<ICollaborator[]>>;
  selectedCollaborators: string[] | undefined;
}

export function ModalBody({
  setCollaboratorName,
  addCollaboratorsList,
  selectedCollaborators,
  setAddCollaboratorsList,
}: IModalBodyProps): JSX.Element {
  const [collaboratorsList, setCollaboratorsList] = useState<ICollaborators[]>([]);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setCollaboratorName(event.target.value);
    const collaborators: ICollaborators[] | { message: string } = await userServices.searchCollaborators(event.target.value);
    if (Array.isArray(collaborators)) {
      const filteredCollaborators = collaborators.filter((collaborator) => !selectedCollaborators?.includes(collaborator.Name));
      setCollaboratorsList(filteredCollaborators);
    }
  };

  return (
    <div className="modal-body" style={{ minHeight: '350px' }}>
      <DebounceInput
        id="collaborators-input"
        className={`form-control shadow-none ${!!collaboratorsList.length && 'active-search'}`}
        onChange={onChange}
        minLength={1}
        debounceTimeout={1000}
      />
      <ul className={`list-group ${!!collaboratorsList.length && 'active-search'}`}>
        {collaboratorsList.map((collaborator, index) => {
          const collaboratorSelected = addCollaboratorsList.some((e) => collaboratorsList.indexOf(e) === index);
          return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li
              className={`list-group-item py-2 text-center ${collaboratorSelected && 'active'} add-collaborator`}
              onClick={() => {
                if (!collaboratorSelected) {
                  setAddCollaboratorsList((curr) => [...curr, collaborator]);
                } else {
                  setAddCollaboratorsList((curr) => curr.filter((id) => id !== collaborator));
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
