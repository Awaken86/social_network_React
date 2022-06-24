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
type FormType = {
    term: string,
    friend: string
}


export const UsersSearchForm: React.FC<UsersSearchFormPropsType> = React.memo((props) => {
    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }
    return (
        <div>
            <h1>Anywhere in your app!</h1>
            <Formik
                initialValues={{ term: '', friend: "null" }}
                validate={UsersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type='text' name='term'></Field>
                        <Field name='friend' as='select' >
                            <option value="null">All</option>
                            <option value="true">followed</option>
                            <option value="false">unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
});
