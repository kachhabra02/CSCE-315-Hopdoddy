import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useEffect } from 'react';

const makeGuard = (authenticate) => function Guard({ children }) {
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const hasPermission = authenticate(user);

  useEffect(() => {
    if (!hasPermission) navigate('/');
  }, [hasPermission, navigate]);

  if (!hasPermission) return (
    <h1>Credentials not valid, rerouting...</h1>
  );

  return children;
}

export const CashierGuard = makeGuard((user) => user.isCashier || user.isManager);
export const ManagerGuard = makeGuard((user) => user.isManager);
