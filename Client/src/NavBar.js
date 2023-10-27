import React from 'react'
import {Link, useLocation} from 'react-router-dom'

function NavBar() {
    const location = useLocation();

    return (
        <div>
            <Link to='/'><button className='landing-button'>Landing Link</button></Link>
            <Link to='/menu'><button>Menu Link</button></Link>
        </div>
    )
}

export default NavBar