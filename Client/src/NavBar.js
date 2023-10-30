import React from 'react'
import {Link, useLocation} from 'react-router-dom'

const MenuLink = () => <Link to='/menu'><button>Menu Link</button></Link>;
const HomeLink = () => <Link to='/'><button className='landing-button'>Landing Link</button></Link>

const locationLinksMap = {
    '/' : [MenuLink, HomeLink],
    '/menu' : [MenuLink, HomeLink],
    '/login' : null,
    undefined : ""
};

function NavBar() {
    const location = useLocation();

    if (locationLinksMap[location.pathname] === null) {
        return <></>
    }

    return (
        <div id='navbar'>
            <h3>
                Hopdoddy!
            </h3>
            <div id='navbar-buttons'>
                {locationLinksMap[location.pathname].map((ButtonComponent, index) => (
                    <React.Fragment key={index}>
                        <ButtonComponent />
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default NavBar