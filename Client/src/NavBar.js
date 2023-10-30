import React from 'react'
import {Link, useLocation} from 'react-router-dom'

const MenuLink = () => <Link to='/menu'><button>Menu Link</button></Link>;
const HomeLink = () => <Link to='/'><button className='landing-button'>Landing Link</button></Link>

const locationLinksMap = {
    '/' : [MenuLink, HomeLink],
    '/menu': [MenuLink, HomeLink, HomeLink]
};

function NavBar() {
    const location = useLocation();

    return (
        <div className='navbar_buttons'>
            {locationLinksMap[location.pathname].map((ButtonComponent, index) => (
                <React.Fragment key={index}>
                    <ButtonComponent />
                </React.Fragment>
            ))}
        </div>
    )
}

export default NavBar