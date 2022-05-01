import React from 'react';
import Loader from '../../common/Loader';
import s from '../Profile.module.css';
import ProfileStatusWithHook from './ProfileStatusWithHook';
import defUserPhoto from '../../../assets/img/user.png'

const Profileinfo = (props) => {
    if (!props.profile) {
        return <Loader />
    }
    const avatarSelector = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        } 
    }
    return <div className={s.profile}>
        <div>
            <img alt={''} src={props.profile.photos.large || defUserPhoto} />
            {props.isOwner && <input type={"file"} onChange={avatarSelector}></input>}
            <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus} />
        </div>



    </div>
}

export default Profileinfo;