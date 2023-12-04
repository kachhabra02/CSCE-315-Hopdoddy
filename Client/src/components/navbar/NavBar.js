import Button from '@mui/material/Button';
import { Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import './NavBar.css';

import React, { useLayoutEffect, useRef, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'

import CartButton from '../customer-subcomponents/CartButton';

import $ from "jquery";

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
    
    // really really jank way of fixing the Google Translate Element
    const [isCustomized, tryCustomizing] = useState({});
    useLayoutEffect(() => {
        $("#google_translate_element img").eq(0).remove();
        $("#google_translate_element div").eq(1).css("background-color", "transparent");
        $("#google_translate_element span").css("border-color", "transparent");
		$("#google_translate_element div").eq(1).css("border-color", "transparent");
		$("#borderColor").val('');
        let el = $("#google_translate_element a").eq(0);
        if (el.length > 0) {
            el.css("max-width", "50px")
            el.css("max-height", "50px")
            el.css("min-width", "50px")
            el.css("min-height", "50px")
            el.css("display", "block")
            el.html(`
                    <svg stroke="white" fill="white" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"
                      style="width: 50px; height: 50px; padding: 12px;"
                    >
                        <path d="M21 4H11l-1-3H3c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h8l1 3h9c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 16c-2.76 0-5-2.24-5-5s2.24-5 5-5c1.35 
                            0 2.48.5 3.35 1.3L9.03 8.57c-.38-.36-1.04-.78-2.03-.78-1.74 0-3.15 1.44-3.15 3.21S5.26 14.21 7 14.21c2.01 0 2.84-1.44 2.92-2.41H7v-1.71h4.68c.07.31.12.61.12 
                            1.02C11.8 13.97 9.89 16 7 16zm6.17-5.42h3.7c-.43 1.25-1.11 2.43-2.05 3.47-.31-.35-.6-.72-.86-1.1l-.79-2.37zm8.33 9.92c0 .55-.45 1-1 1H14l2-2.5-1.04-3.1 3.1 
                            3.1.92-.92-3.3-3.25.02-.02c1.13-1.25 1.93-2.69 2.4-4.22H20v-1.3h-4.53V8h-1.29v1.29h-1.44L11.46 5.5h9.04c.55 0 1 .45 1 1v14z">
                        </path>
                        <path fill="none" d="M0 0h24v24H0zm0 0h24v24H0z">
                        </path>
                    </svg>
                `
            );
        } else {
            setTimeout(() => tryCustomizing({}), 500)
        }
    }, [isCustomized])

    const gtref = useRef(null);

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
            <IconButton sx={{width: 50, height: 50, color: "white"}}>
                <div id="google_translate_element" style={{bgcolor: "transparent",}} ref={gtref}></div>
            </IconButton>
        </Toolbar>
    )
}

export default NavBar;
