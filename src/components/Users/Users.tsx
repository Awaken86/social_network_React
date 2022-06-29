import React, { useEffect } from "react";
import userPhoto from '../../assets/img/user.png';
import { NavLink, useHistory } from 'react-router-dom';
import s from './Users.module.css';
import { UsersSearchForm } from "./UsersSearchForm";
import { UsersPaginator } from "./usersPaginator";
import { FilterType, getUsers } from "../../redux/users-reducer";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getPortionSize, getResectUsers, getTotalUsersCount, getUsersFilter } from "../../redux/users-selector";
import queryString from 'query-string';

type PropsType = {

}
type queryParamsType = {
    term?: string
    page?: string
    friend?: string
}
export const Users: React.FC<PropsType> = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const users = useSelector(getResectUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    const portionSize = useSelector(getPortionSize)


    useEffect(() => {
        const parsed = queryString.parse(history.location.search)
        let actualPage = currentPage
        let actualFilter = filter
        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }
        if (!!parsed.friend) actualFilter = { ...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false }
        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const queryParams: queryParamsType = {}
        if (!!filter.term) queryParams.term = filter.term
        if (filter.friend !== null) queryParams.friend = String(filter.friend)
        if (currentPage !== 1) queryParams.page = String(currentPage)
        history.push({
            pathname: '/developers',
            search: queryString.stringify(queryParams)
        })
    }, [filter, currentPage])


    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <>
            <UsersPaginator
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                portionSize={portionSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}>
            </UsersPaginator>

            <div>All Users</div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            {
                users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={`/profile/${u.id}`}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="" className={s.userImg} />
                            </NavLink>
                        </div>
                        <div>
                            {u.follower
                                ? <button disabled={followingInProgress
                                    .some(id => id === u.id)}
                                    onClick={() => { unfollow(u.id) }}>
                                    unfollow
                                </button>
                                : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                    follow(u.id);
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
        </>)
}
