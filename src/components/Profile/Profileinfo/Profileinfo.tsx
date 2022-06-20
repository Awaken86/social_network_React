import React, { ChangeEvent } from 'react';
import Loader from '../../common/Loader';
import s from '../Profile.module.css';
import ProfileStatusWithHook from './ProfileStatusWithHook';
import defUserPhoto from '../../../assets/img/user.png'
import { ProfileType } from '../../../types/Types';

type ProfileinfoPropsType = {
    profile: ProfileType | null
    savePhoto: (file: File) => void
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
}
const Profileinfo: React.FC<ProfileinfoPropsType> = (props) => {
    if (!props.profile) {
        return <Loader />
    }
    const avatarSelector = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
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