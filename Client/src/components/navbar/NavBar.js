import Button from '@mui/material/Button';
import { Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';

import './NavBar.css';
import { BsFillHouseFill } from "react-icons/bs";

import React from 'react'
import {Link, useLocation} from 'react-router-dom'

import CartButton from '../customer-subcomponents/CartButton';

const makeButton = (path, label) => () => <Button color='inherit' component={Link} to={path}>{label}</Button>;

const MenuLink = makeButton('/menu', 'Menu');
const HomeLink = makeButton('/', 'Home');
const CashierLink = makeButton('/cashier', 'Cashier');
const ManagerLink = makeButton('/manager', 'Manager');
const CustomerLink = makeButton('/customer', 'Customer');

const locationLinksMap = {
    default : [HomeLink, MenuLink, CashierLink, ManagerLink, CustomerLink],
    '/' : [MenuLink, CashierLink, ManagerLink, CustomerLink],
    '/menu' : [HomeLink, CashierLink, ManagerLink, CustomerLink],
    '/manager' : [HomeLink, MenuLink, CashierLink, CustomerLink],
    '/cashier' : [HomeLink, MenuLink, ManagerLink, CustomerLink],
    '/customer' : [MenuLink, HomeLink, CashierLink],
    '/login' : null
};

function NavBar({onUpdate}) {
    const location = useLocation();

    if (locationLinksMap[location.pathname] === null) {
        return <></>
    }

    return (
        <Toolbar id = 'navbar'>
            <Typography variant="h6" component="div" sx={{ textAlign: 'left', flexGrow: 1 }}>
                Hopdoddy
            </Typography>
            <div id='navbar-buttons'>
                {(location.pathname === '/customer' 
                    ? [() => <CartButton onUpdate={onUpdate}/>].concat(locationLinksMap[location.pathname]) 
                    : (locationLinksMap[location.pathname] ?? locationLinksMap.default)
                 )
                    .map((ButtonLink, index) => (
                        <React.Fragment key={index}>
                            <ButtonLink />
                        </React.Fragment>
                    )
                )}
            </div>
        </Toolbar>
    )
}

export default NavBar;
