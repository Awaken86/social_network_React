import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../common/Loader';
import { getIsLoading } from '../../redux/users-selector';
import { Users } from './Users';

type UsersPagePropsType = {
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isLoading = useSelector(getIsLoading)
    return (
        <div>
            {isLoading ? <Loader /> : null}
            <Users/>
        </div>
    )
}

