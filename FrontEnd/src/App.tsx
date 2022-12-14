import './styles/App.scss';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/header';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { GlobalProvider } from './context/GlobalProvider';
import { services } from './services';
import Manage from './pages/Manage';
import { ManageProvider } from './context/ManageProvider';

function App(): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { token } = localStorage;

  useEffect(() => {
    const auth = async (): Promise<void> => {
      const authentified = await services.tokenVerify(token);

      if (authentified && pathname === '/') {
        navigate('/dashboard');
      }
      if (pathname !== '/' && !authentified) {
        navigate('/');
      }
    };

    auth();
  }, []);

  const ManageWithProvider = (
    <ManageProvider>
      <Manage />
    </ManageProvider>
  );

  return (
    <GlobalProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage" element={ManageWithProvider} />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
