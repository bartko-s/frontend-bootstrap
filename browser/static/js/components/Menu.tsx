import * as React from 'react'
import {Link} from 'react-router-dom'

const Menu: React.FunctionComponent = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Homepage</Link>
            </li>
            <li>
                <Link to="/minions">Minions</Link>
            </li>
        </ul>
    </nav>
)

export default Menu;
