import { GlobalStateType } from "./redux-store";

export const getLogin = (state: GlobalStateType) => {
    return state.auth.login;
}
export const getIsAuth = (state: GlobalStateType) => {
    return state.auth.isAuth;
}