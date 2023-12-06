import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useEffect, useState } from 'react';

const makeGuard = (authenticate) => function Guard({ children }) {
  
  const navigate = useNavigate();
  const { userObj } = useAuth();
  const hasPermission = authenticate(userObj);
  const [tempAccess, setTempAccess] = useState(true); // Temporary access state

  useEffect(() => {
    const timer = setTimeout(() => {
      setTempAccess(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasPermission && !tempAccess) {
      navigate('/');
    } 
  }, [hasPermission, navigate]);

  if (!hasPermission && !tempAccess) {
    return null;
  }

  return children;
}

export const CashierGuard = makeGuard((userObj) => userObj.isCashier || userObj.isManager || userObj.isAdmin);
export const ManagerGuard = makeGuard((userObj) => userObj.isManager || userObj.isAdmin);
export const   AdminGuard = makeGuard((userObj) => userObj.isAdmin);
