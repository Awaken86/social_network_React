import { actions, follow, unfollow } from "../users-reducer"
import { usersAPI } from "../../api/users-api"
import { ApiResponseType, ResultCodesEmun } from "../../api/api"


jest.mock("../../api/users-api")
const usersAPI_Mock = usersAPI as jest.Mocked<typeof usersAPI>

beforeEach(() => {
    dispatchMock.mockClear
    getStateMock.mockClear
    usersAPI_Mock.follow.mockClear
    usersAPI_Mock.unfollow.mockClear
})
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

const result: ApiResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodesEmun.Succes
}

usersAPI_Mock.follow.mockReturnValue(Promise.resolve(result))

usersAPI_Mock.unfollow.mockReturnValue(Promise.resolve(result))

test("follow thunk", async () => {
    const thunk = follow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingProgress(false, 1))
})
test("unfollow", async () => {
    const thunk = unfollow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingProgress(false, 1))
})

