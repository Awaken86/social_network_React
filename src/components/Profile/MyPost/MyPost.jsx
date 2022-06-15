import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validator';
import { Textarea } from '../../common/FormsControls/FormsControls';

import Post from './Post/Post';

const maxlegth10 = maxLengthCreator(10);

let AddNewPostForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <Field name="newPostText" component={Textarea} validate={[required, maxlegth10]} />
                <button>Say хуйню</button>
            </form>
        </div>)
}

AddNewPostForm = reduxForm({ form: "ProfileAddNewPostsForm" })(AddNewPostForm)

const MyPost = React.memo(props => {
    let PostElements = props.PostData.map(p => <Post key={props.PostData} message={p.message} likesCount={p.likesCount} dislikesCount={p.dislikesCount} />);


    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <>
            <h3>My posts</h3>
            <AddNewPostForm onSubmit={onAddPost} />
            <>{PostElements}</>
        </>
    )
})

export default MyPost;