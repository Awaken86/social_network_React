import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validator";
import { Input } from "../common/FormsControls/FormsControls";
import { login } from '../../redux/auth-reducer'
import { Redirect } from "react-router-dom";
import style from '../common/FormsControls/FormsControls.module.css'
import { GlobalStateType } from "../../redux/store-redux";

type LoginReduxFormValuesType = {
    email: string, password: string, rememberMe: boolean, captcha: string
}

type LoginFormOwnPropsType = {
    captchaUrl: string | null

}
const LoginForm: React.FC<InjectedFormProps<LoginReduxFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"login"} name={"email"} component={Input} validate={[required]} />
            </div>
            <div>
                <Field placeholder={"password"} name={"password"} component={Input} validate={[required]} type={"password"} />
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={Input} />
            </div>
            {props.captchaUrl && <div>
                <img alt="" src={props.captchaUrl}></img>
                <Field placeholder={"Symbols for image"} name={"capcha"} component={Input} validate={[required]} />
            </div>}
            {props.error && <div className={style.formError}>
                {props.error}
            </div>
            }
            <div>
                <button>login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginReduxFormValuesType, LoginFormOwnPropsType>({
    form: 'login'
})(LoginForm)

export const Login: React.FC = () => {
    const captchaUrl = useSelector((state: GlobalStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: GlobalStateType) => state.auth.isAuth)
    const dispatch = useDispatch()
    const onSubmit = (formData: LoginReduxFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={"profile"} />
    }
    return <div>
        <h1>login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
}
