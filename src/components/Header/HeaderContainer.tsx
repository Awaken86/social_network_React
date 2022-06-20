import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { GlobalStateType } from '../../redux/redux-store';
import Header, { dispatchPropsType, mapPropsType } from './Header';


class HeaderContainer extends React.Component<mapPropsType & dispatchPropsType> {
    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (state: GlobalStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    logout: () => { }
});
export default connect<mapPropsType, dispatchPropsType, {}, GlobalStateType>(mapStateToProps, { logout })(HeaderContainer);