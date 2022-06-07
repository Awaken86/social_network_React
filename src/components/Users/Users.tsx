import React, { useState } from "react";
import userPhoto from '../../assets/img/user.png';
import { NavLink } from 'react-router-dom';
import { UserType } from "../../types/Types";
//@ts-ignore
import s from './Users.module.css';




type PropsType = {
    totalItemsCount: number
    pageSize: number
    portionSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (id: number) => void
    unfollow: (id: number) => void
    followingInProgress: Array<number>

}
let Users: React.FC<PropsType> = (props) => {

    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = (portionNumber) * props.portionSize;

    return <div>
        <div className={s.scPages}>
            {portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber - 1) }}>Prev</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span className={props.currentPage === p && s.selectedPage}
                        onClick={(e) => { props.onPageChanged(p); }}>{p}</span>
                })}
            {portionCount > portionNumber &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</button>}
        </div>
        <div>All Users</div>
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
                                unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.follow(u.id);
                            }}>follow</button>}
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