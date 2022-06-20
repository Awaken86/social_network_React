import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

export type mapPropsType = {
    isAuth: boolean
    login: string | null

}
export type dispatchPropsType = {
    logout: () => void
}
const Header: React.FC<mapPropsType & dispatchPropsType> = (props) => {
    return <header className={s.header}>
        <img alt='' src='https://i.pinimg.com/736x/22/17/be/2217be4d416facec25af63f829958405.jpg' />
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Log out</button> </div>
                : <NavLink to={'/login'}>Login</NavLink>}

        </div>
    </header>
}

export default Header;