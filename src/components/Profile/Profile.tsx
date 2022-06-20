import React from 'react';
import { ProfileType } from '../../types/Types';
import MyPostContainer from './MyPost/MyPostContainer';
import Profileinfo from './Profileinfo/Profileinfo';

type PropsType = {
    profile: ProfileType | null
    savePhoto: (file: File) => void
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
}
const Profile: React.FC<PropsType> = (props) => {
    /*if (!props.isAuth) return <Redirect to={'/login'} />;*/
    return (
        <div>
            <Profileinfo
                savePhoto={props.savePhoto}
                isOwner={props.isOwner} profile={props.profile}
                status={props.status} updateStatus={props.updateStatus} />
            <MyPostContainer />

        </div>

    )
}


export default Profile; 