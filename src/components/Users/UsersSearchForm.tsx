import React from "react";
import { Field, Form, Formik } from "formik";
import { FilterType } from "../../redux/users-reducer";

const UsersSearchFormValidate = (values: any) => {
    const erros = {}
    return erros
}
type UsersSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}
export const UsersSearchForm: React.FC<UsersSearchFormPropsType> = React.memo((props) => {
    const submit = (values: FilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void; }) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    };
    return (
        <div>
            <h1>Anywhere in your app!</h1>
            <Formik
                initialValues={{ term: '' }}
                validate={UsersSearchFormValidate}
                onSubmit={submit}

            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type='text' name='term'></Field>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
});
