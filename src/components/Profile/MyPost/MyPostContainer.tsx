import { connect } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import { GlobalStateType } from '../../../redux/store-redux';
import MyPost, { dispatchPropsType, mapPropsType } from './MyPost';

let mapStateToProps = (state: GlobalStateType) => {
    return {
        PostData: state.profilePage.PostData,
        newPostText: state.profilePage.newPostText
    } as mapPropsType
}

const MyPostContainer = connect<mapPropsType, dispatchPropsType, {}, GlobalStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPost);

export default MyPostContainer;