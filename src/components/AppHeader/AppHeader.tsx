import { Avatar, Button, Col, Layout, Menu, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
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

export default AppHeader;