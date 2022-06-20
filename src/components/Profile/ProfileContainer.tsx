import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getStatus, updateStatus, savePhoto } from '../../redux/profile-reducer'
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { GlobalStateType } from '../../redux/redux-store';
import { RouteComponentProps } from 'react-router-dom';

type mapPropsType = ReturnType<typeof mapStateToProps>
type mapDispatchType = {
    getUserProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
}
type PathParamsType = {
    userId: string
}

type propsType = mapPropsType & mapDispatchType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<propsType> {
    refreshComponent() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.MyAuthUserId;
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        
        this.props.getUserProfile(userId as number);
        this.props.getStatus(userId as number);
    }
    componentDidMount() {
        this.refreshComponent()
    }
    componentDidUpdate(prevProps: propsType, prevState: propsType) {
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
                savePhoto={this.props.savePhoto} />
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

let mapStateToProps = (state: GlobalStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    MyAuthUserId: state.auth.userId,
    isAuth: state.auth.isAuth

});
export default compose<React.ComponentType>(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto }),
    withRouter
    //withAuthRedirect
)(ProfileContainer);


