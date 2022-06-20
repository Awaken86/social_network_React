import React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { PostDataType } from '../../../types/Types';
import { maxLengthCreator, required } from '../../../utils/validators/validator';
import { Textarea } from '../../common/FormsControls/FormsControls';
import Post from './Post/Post';

const maxlegth10 = maxLengthCreator(10);

type AddNewPostFormPropsType = {}
type addPostFormValuesType = {
    newPostText: string
}
const AddNewPostForm: React.FC<InjectedFormProps<addPostFormValuesType, AddNewPostFormPropsType> & AddNewPostFormPropsType> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <Field name="newPostText" component={Textarea} validate={[required, maxlegth10]} />
                <button>Say хуйню</button>
            </form>
        </div>)
}

const AddNewPostFormRedux = reduxForm<addPostFormValuesType>({ form: "ProfileAddNewPostsForm" })(AddNewPostForm)


export type mapPropsType = {
    PostData: Array<PostDataType>
}
export type dispatchPropsType = {
    addPost: (newPostText: string) => void
}
const MyPost: React.FC<mapPropsType & dispatchPropsType> = React.memo(props => {
    let PostElements =
        [...props.PostData]
            .map(p => <Post
                id={p.id}
                key={p.id}
                message={p.message}
                likesCount={p.likesCount}
                dislikesCount={p.dislikesCount}
            />);


    let onAddPost = (values: addPostFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return (
        <>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost} />
            <>{PostElements}</>
        </>
    )
})
const MyPostMemo = React.memo(MyPost)

export default MyPostMemo;