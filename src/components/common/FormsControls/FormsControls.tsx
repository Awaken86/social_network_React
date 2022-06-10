import React from 'react';
import { WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import s from './FormsControls.module.css';

type FormControlParamsType = {
    meta: WrappedFieldMetaProps
}


const FormControl: React.FC<FormControlParamsType> = ({ meta: { touched, error }, children }) => {
    const DefError = touched && error;
    return (
        <div className={s.formControl + " " + (DefError ? s.error : "")} >
            <div>{children}</div>
            {DefError && <span>{error}</span>}
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    //const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props} > <textarea {...input} {...restProps}> </textarea></FormControl >
    )
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props
    return <FormControl {...props} > <input {...input} {...restProps}> </input></FormControl >
}