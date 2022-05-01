import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import { Redirect } from 'react-router';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validator';
import { Textarea } from '../common/FormsControls/FormsControls';

const maxlegth10 = maxLengthCreator(10);
const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogsData.map(d => <DialogItem name={d.name} id={d.id} />);
    let messagesElements = state.messagesData.map(m => <Message message={m.message} />);



    let addNewMessage = (values) => {
        props.sendMessage(values.NewMessageBody);
    }

    if (!props.isAuth) return <Redirect to={'/login'} />;
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            <AddNewMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}
const AddNewMessageForm = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} validate={[required, maxlegth10]} name={"NewMessageBody"} placeholder='Ну шо пиши свою хуйню'></Field>
        </div>
        <div>
            <button>Say хуйню</button>
        </div>
    </form>)
}
const AddNewMessageFormRedux = reduxForm({form:"AddNewMessageForm"})(AddNewMessageForm)

export default Dialogs;
