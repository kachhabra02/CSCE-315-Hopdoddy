import Button from '@mui/material/Button';
import { Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';

import './NavBar.css';

import React from 'react'
import {Link, useLocation} from 'react-router-dom'


const MenuLink = () => <Link to='/menu'><Button color="inherit">Menu Link</Button></Link>;
const HomeLink = () => <Link to='/'><Button color="inherit">Landing Link</Button></Link>
const CashierLink = () => <Link to='/cashier'><Button color="inherit">Cashier Link</Button></Link>;

const locationLinksMap = {
    default : [MenuLink, HomeLink, CashierLink],
    '/' : [MenuLink, HomeLink, CashierLink],
    '/menu' : [MenuLink, HomeLink, CashierLink],
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
        </Toolbar>
    )
}

export default NavBar