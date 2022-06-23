import usersReducer, { actions, InitialStateType } from "../users-reducer"

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'user 0',
                follower: false,
                status: 'status 0',
                photos: { large: null, small: null }
            },
            {
                id: 1,
                name: 'user 1',
                follower: false,
                status: 'status 1',
                photos: { large: null, small: null }
            },
            {
                id: 2,
                name: 'user 2',
                follower: true,
                status: 'status 2',
                photos: { large: null, small: null }
            }, {
                id: 3,
                name: 'user 3',
                follower: true,
                status: 'status 3',
                photos: { large: null, small: null }
            },
        ],
        pageSize: 5,
        totalUsersCount: 20,
        currentPage: 1,
        isLoading: false,
        followingInProgress: [],
        portionSize: 15,
        filter: {
            term: '',
            friend: null
        }
    }
})

test("followSuccess", () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].follower).toBeFalsy()
    expect(newState.users[1].follower).toBeTruthy()
})
test("unfollowSuccess", () => {
    const newState = usersReducer(state, actions.unfollowSuccess(2))
    expect(newState.users[2].follower).toBeFalsy()
    expect(newState.users[3].follower).toBeTruthy()
})