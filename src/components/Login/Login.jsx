import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validator";
import { Input } from "../common/FormsControls/FormsControls";
import { login } from '../../redux/auth-reducer'
import { Redirect } from "react-router-dom";
import style from '../common/FormsControls/FormsControls.module.css'
const LoginForm = (props) => {
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

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)
const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"profile"} />
    }
    return <div>
        <h1>login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}
const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { login })(Login)