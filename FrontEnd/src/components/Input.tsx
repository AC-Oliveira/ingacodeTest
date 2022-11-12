import { IconType } from 'react-icons/lib';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: IconType;
}

export function Input({ Icon, ...props }: IInputProps): JSX.Element {
  return (
    <div className="input-group mb-3 mt-3 w-100" style={{ maxWidth: '474.9px' }}>
      {Icon && (
        <div className="input-group-prepend border border-1 p-2 rounded-start p-0 bg-gray-200">
          <span className="bg-gray-200">
            <Icon size={25} color="0a58ca" />
          </span>
        </div>
      )}
      <input {...props} />
    </div>
  );
}
