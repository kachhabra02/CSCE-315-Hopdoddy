import { useNavigate } from 'react-router-dom';

export function ManagerCred ({ children }) {
  const navigate = useNavigate();
  const credentials = useCredentials();

  const isAuthenticated = credentials.isManager;

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return children;
}

export function CashierCred ({ children }) {
  const navigate = useNavigate();
  const credentials = useCredentials();

  const isAuthenticated = credentials.isManager || credentials.isCashier;

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return children;
}