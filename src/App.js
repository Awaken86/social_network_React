import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Loader from './components/common/Loader';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/Users-Container';
import { initializeApp } from './redux/app-reducer.ts';

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if (!this.props.initialized) {
            return <Loader />
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>

                    <Route path='/dialogs'
                        render={() => <DialogsContainer />} />

                    <Route path='/profile/:userId?'
                        render={() => <ProfileContainer />} />

                    <Route path='/users'
                        render={() => <UsersContainer />} />

                    <Route path='/login'
                        render={() => <Login />} />
                </div>
            </div>)
    }
}
const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
export default compose(
    withRouter,
    connect(mapStateToProps, { initializeApp }))(App);