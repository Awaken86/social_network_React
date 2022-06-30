import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import { compose } from 'redux'
import Loader from './components/common/Loader'
import { Login } from './components/Login/Login'
import { UsersPage } from './components/Users/Users-Container'
import { initializeApp } from './redux/app-reducer'
import { GlobalStateType } from './redux/redux-store'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu, Breadcrumb } from 'antd'
import AppHeader from './components/Header/AppHeader'
import { withSuspense } from './hoc/withSuspense'
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'))

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
const DialogsContainerWithSuspense = withSuspense(DialogsContainer)
const ProfileContainerWithSuspense = withSuspense(ProfileContainer)
const ChatPageWithSuspense = withSuspense(ChatPage)
class App extends Component<MapPropsType & DispatchPropsType>{
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if (!this.props.initialized) {
            return <Loader />
        }
        return (
            <Layout>
                <AppHeader />
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" title={<span><UserOutlined type="user" />My Profile</span>}>
                                    <Menu.Item key="1"><Link to="/profile" >Profile</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/dialogs">Messages</Link></Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><LaptopOutlined type="laptop" />Developers</span>}>
                                    <Menu.Item key="5"><Link to="/developers">Developers</Link></Menu.Item>
                                    <Menu.Item key="6"><Link to="/chat">chat</Link></Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><NotificationOutlined type="notification" />subnav 3</span>}>
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Switch>
                                <Route path='/dialogs'
                                    render={() => <DialogsContainerWithSuspense />} />
                                <Route path='/profile/:userId?'
                                    render={() => <ProfileContainerWithSuspense />} />
                                <Route path='/developers'
                                    render={() => <UsersPage />} />
                                <Route path='/login'
                                    render={() => <Login />} />
                                <Route path='/chat'
                                    render={() => <ChatPageWithSuspense />} />
                                <Route path='*'
                                    render={() => <div>
                                        404 not found
                                    </div>
                                    } />
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Social Network
                </Footer>
            </Layout>)

    }
}
const mapStateToProps = (state: GlobalStateType) => ({
    initialized: state.app.initialized
})
export default compose(
    withRouter,
    connect(mapStateToProps, { initializeApp }))(App);