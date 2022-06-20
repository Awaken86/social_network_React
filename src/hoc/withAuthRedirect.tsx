import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { GlobalStateType } from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: GlobalStateType) => ({
    isAuth: state.auth.isAuth
});
type mapPropsType = {
    isAuth: boolean
}
type dispatchPropsType = {

}
//WCP -WrappedComponentProps
export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<mapPropsType & dispatchPropsType> = (props) => {
        let { isAuth, ...restProps } = props
        if (!isAuth) return <Redirect to={'/login'} />
        return <Component{...restProps as unknown as WCP} />
    }
    let ConnectedAuthRedirectComponent = connect<mapPropsType, dispatchPropsType, WCP, GlobalStateType>
        (mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}