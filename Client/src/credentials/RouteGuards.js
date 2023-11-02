import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useEffect } from 'react';

const makeGuard = (authenticate) => function Guard({ children }) {
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const hasPermission = authenticate(user);

  useEffect(() => {
    if (!hasPermission) {
      navigate('/');  // TODO: More complicated action than a redirect will be needed here. Probably.
    } 
  }, [hasPermission, navigate]);

  if (!hasPermission) {
    return null;
  }

  return children;
}

export const CashierGuard = makeGuard((user) => user.isCashier || user.isManager);
export const ManagerGuard = makeGuard((user) => user.isManager);
