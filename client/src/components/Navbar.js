import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navbar.css';

export default function Navbar(props) {
    return(
        <nav className='navbar'>
            <ul>
                <li>
                    <NavLink to='/' className={({ isActive }) => isActive ? 'link activeLink' : 'link'} id='logo'>
                        CDM S&D
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/roster' className={({ isActive }) => isActive ? 'link activeLink' : 'link'}>
                        Roster
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/attendance' className={({ isActive }) => isActive ? 'link activeLink' : 'link'}>
                        Attendance
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/groups' className={({ isActive }) => isActive ? 'link activeLink' : 'link'}>
                        Groups
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/' className='link' id='signOut' onClick={() => {
                            props.setUser('');
                            props.ssetStudentsFetched(false); 
                        }
                    }>
                        Sign Out
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

Navbar.propTypes = {
    setUser: PropTypes.func.isRequired,
    setStudentsFetched: PropTypes.func.isRequired
}