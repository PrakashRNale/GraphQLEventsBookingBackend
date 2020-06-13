import React , { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.scss';
import AuthContext from '../../context/AuthContext';

const MainNavigation = props => {
    const authContext = useContext(AuthContext);
    debugger;
    return(
        <header className={classes.MainNavigation}>
            <div className={classes.logo}>
                <h1>Logo</h1>
            </div>
            <nav className={classes.NavigationItems}>
                <ul>
                    {!authContext.token && (
                        <li><NavLink to="/auth">Auth</NavLink></li>
                    )}
                    <li><NavLink to="/events">Events</NavLink></li>
                    {authContext.token && (
                        <React.Fragment>
                            <li><NavLink to="/booking">Booking</NavLink></li>
                            <li onClick={authContext.logout}> <a>Logout</a> </li>
                        </React.Fragment>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;