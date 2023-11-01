import { useNavigate } from 'react-router-dom';
import { useCredentials } from './AuthProvider';
import { useEffect } from 'react';

export const ManagerGuard = ({ children }) => {
  <Guard authenticate={(cred) => cred.isManager}>
    { children }
  </Guard>
};

export const CashierGuard = ({ children }) => {
  <Guard authenticate={(cred) => cred.isCashier || cred.isManager}>
    { children }
  </Guard>
};

function Guard({ children, authenticate }) {
  
  const navigate = useNavigate();
  const credentials = useCredentials();
  const isAuthenticated = authenticate(credentials);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  });

  if (!isAuthenticated) {
    return (
      <h1>Credentials not valid, rerouting...</h1>
    );
  }

  return children;
}
