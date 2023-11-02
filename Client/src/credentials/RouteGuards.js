import { useNavigate } from 'react-router-dom';
import { useCredentials } from './AuthProvider';
import { useEffect } from 'react';

const makeGuard = (authenticate) => function Guard({ children }) {
  
  const navigate = useNavigate();
  const credentials = useCredentials();
  const hasPermission = authenticate(credentials);

  useEffect(() => {
    if (!hasPermission) {
      navigate('/') ;
    }
  }, [hasPermission, navigate]);

  if (!hasPermission) {
    return (
      <h1>Credentials not valid, rerouting...</h1>
    );
  }

  return children;
}

export const CashierGuard = makeGuard((cred) => cred.isCashier || cred.isManager);
export const ManagerGuard = makeGuard((cred) => cred.isManager);
