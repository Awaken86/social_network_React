import { Avatar, Button, Col, Layout, Menu, Row } from 'antd';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStateType } from '../../redux/redux-store';
import { logout } from '../../redux/auth-reducer';
import { getIsAuth, getLogin } from '../../redux/auth-selector';
const { Header } = Layout;


type AppHeaderProps = {
}
const AppHeader: React.FC<AppHeaderProps> = (props) => {
    const login = useSelector(getLogin)
    const isAuth = useSelector(getIsAuth)
    const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout())
    }
    return (
        <Header className="header">
            <div className="logo" />
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
                        <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
                    </Menu>
                </Col>
                {isAuth ?
                    <>
                        <Col span={1}>
                            <Avatar alt={login || ''} icon={<UserOutlined />} />
                        </Col>
                        <Col span={5}>
                            <Button onClick={logoutCallback}>Log out</Button>
                        </Col>
                    </>
                    :
                    <Col span={5}>
                        <Button><Link to={'/login'}>Login</Link></Button>
                    </Col>}
            </Row>
        </Header>
    )
}
// <header className={s.header}>
//     <img alt='' src='https://i.pinimg.com/736x/22/17/be/2217be4d416facec25af63f829958405.jpg' />
//     <div className={s.loginBlock}>
//         {props.isAuth
//             ? <div>{props.login} - <button onClick={props.logout}>Log out</button> </div>
//             : <NavLink to={'/login'}>Login</NavLink>}
//     </div>
// </header>
export default AppHeader;