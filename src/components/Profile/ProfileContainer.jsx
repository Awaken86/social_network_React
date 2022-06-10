import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getStatus, updateStatus, savePhoto } from '../../redux/profile-reducer'
import { withRouter } from 'react-router';
import { compose } from 'redux';


class ProfileContainer extends React.Component {
    refreshComponent() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.MyAuthUserId;
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.refreshComponent()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshComponent()
        }

    }

    render() {

        return (
            <Profile {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus} 
                savePhoto={this.props.savePhoto}/>
        )
    }
}

/*
let mapStateToProps = (state) => ({
profile: state.profilePage.profile,
status: state.profilePage.status,
MyAuthUserId: state.auth.userId,
isAuth: state.auth.isAuth
});
*/

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    MyAuthUserId: state.auth.userId,
    isAuth: state.auth.isAuth

});
export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto }),
    withRouter
    //withAuthRedirect
)(ProfileContainer);


