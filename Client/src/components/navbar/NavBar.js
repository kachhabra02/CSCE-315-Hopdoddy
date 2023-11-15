import Button from '@mui/material/Button';
import { Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import './NavBar.css';

import React from 'react'
import {Link, useLocation} from 'react-router-dom'

const makeButton = (path, label) => () => <Button color='inherit' component={Link} to={path}>{label}</Button>;

const MenuLink = makeButton('/menu', 'Menu');
const HomeLink = makeButton('/', 'Home');
const CashierLink = makeButton('/cashier', 'Cashier');
const ManagerLink = makeButton('/manager', 'Manager');

const locationLinksMap = {
    default : [HomeLink, MenuLink, CashierLink, ManagerLink],
    '/' : [MenuLink, CashierLink, ManagerLink],
    '/menu' : [HomeLink, CashierLink, ManagerLink],
    '/manager' : [HomeLink, MenuLink, CashierLink],
    '/cashier' : [HomeLink, MenuLink, ManagerLink],
    '/login' : null
};

function NavBar() {
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
                {(locationLinksMap[location.pathname] ?? locationLinksMap.default)
                    .map((ButtonLink, index) => (
                        <React.Fragment key={index}>
                            <ButtonLink />
                        </React.Fragment>
                    )
                )}
            </div>
            <Box sx={{ mx: 2 }}>
                <div id="google_translate_element"></div>
            </Box>
        </Toolbar>
    )
}

export default NavBar