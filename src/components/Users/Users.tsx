import React from "react";
import userPhoto from '../../assets/img/user.png';
import { NavLink } from 'react-router-dom';
import { UserType } from "../../types/Types";
import s from './Users.module.css';
import { UsersSearchForm } from "./UsersSearchForm";
import { UsersPaginator } from "./usersPaginator";
import { FilterType } from "../../redux/users-reducer";


type PropsType = {
    totalItemsCount: number
    pageSize: number
    portionSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (id: number) => void
    unfollow: (id: number) => void
    onFilterChanged: (filter: FilterType) => void
    followingInProgress: Array<number>

}
const Users: React.FC<PropsType> = (props) => {

    return <div>
        <UsersPaginator
            totalItemsCount={props.totalItemsCount}
            pageSize={props.pageSize}
            portionSize={props.portionSize}
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}>
        </UsersPaginator>

        <div>All Users</div>
        <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={`/profile/${u.id}`}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="" className={s.userImg} />
                        </NavLink>
                    </div>
                    <div>
                        {u.follower
                            ? <button disabled={props.followingInProgress
                                .some(id => id === u.id)}
                                onClick={() => { props.unfollow(u.id) }}>
                                unfollow
                            </button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.follow(u.id);
                            }}>follow
                            </button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{/*u.Location.country*/}</div>
                        <div>{/*u.Location.city*/}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}
export default Users;