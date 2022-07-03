import { GlobalStateType } from "./store-redux";

export const getLogin = (state: GlobalStateType) => {
    return state.auth.login;
}
export const getIsAuth = (state: GlobalStateType) => {
    return state.auth.isAuth;
}