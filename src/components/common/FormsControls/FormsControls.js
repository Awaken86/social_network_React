import React from 'react';
import s from './FormsControls.module.css';

const TagControl = ({ input, meta:{touched, error}, children }) => {
    const DefError = touched && error;
    return (
        <div className={s.formControl + " " + (DefError ? s.error : "")}>
            <div >
                {children}
            </div>

            {DefError && <span>{error}</span>}

        </div>
    )
}


export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props
    return (
        <TagControl {...props}><textarea {...input} {...restProps}></textarea></TagControl>
    )
}
export const Input = (props) => {
    const { input, meta, child, ...restProps } = props
    return <TagControl {...props}><input {...input} {...restProps}></input></TagControl>
}