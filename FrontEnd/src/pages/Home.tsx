import { useState } from 'react';
import { RiLockFill, RiUser3Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import userServices from '../services/user';

export function Home(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  return (
    <div className="content d-flex flex-column justify-content-center align-items-center mx-2">
      <div style={{ maxWidth: '755px' }} className="login bg-white rounded border border-gray-200 p-3 p-lg-5 w-100">
        <h3 className="mt-1 fw-bold text-blue-600">Login</h3>
        <form className="d-flex flex-column justify-content-center align-items-center">
          <Input
            type="text"
            className="form-control shadow-none"
            placeholder="Nome de usuário"
            Icon={RiUser3Line}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Input
            type="password"
            className="form-control shadow-none"
            placeholder="Senha"
            Icon={RiLockFill}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button
            style={{ maxWidth: '474.9px' }}
            onClick={async (e) => {
              e.preventDefault();
              await userServices.login(username, password, navigate);
            }}
            type="submit"
            className="btn btn-primary my-3 btn-border-radius-pill w-100 shadow-none"
          >
            Fazer Login
          </button>
        </form>
      </div>
    </div>
  );
}
