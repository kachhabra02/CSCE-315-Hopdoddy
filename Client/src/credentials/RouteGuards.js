import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useEffect } from 'react';

const makeGuard = (authenticate) => function Guard({ children }) {
  
  const navigate = useNavigate();
  const { userObj } = useAuth();
  const hasPermission = authenticate(userObj);

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

export const CashierGuard = makeGuard((userObj) => userObj.isCashier || userObj.isManager);
export const ManagerGuard = makeGuard((userObj) => userObj.isManager);
