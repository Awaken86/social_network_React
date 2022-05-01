import React from 'react';
import MyPostContainer from './MyPost/MyPostContainer';
import Profileinfo from './Profileinfo/Profileinfo';

const Profile = (props) => {
    /*if (!props.isAuth) return <Redirect to={'/login'} />;*/
    return (
        <div>
            <Profileinfo savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
            <MyPostContainer />
            
        </div>  
        
    )
}


export default Profile; 