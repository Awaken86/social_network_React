import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import { Field, InjectedFormProps } from 'redux-form';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validator';
import { Textarea } from '../common/FormsControls/FormsControls';
import { initialStateType } from '../../redux/dialogs-reducer';

const maxlegth10 = maxLengthCreator(10);

type PropsType = {
    dialogsPage: initialStateType
    sendMessage: (messageText: string) => void
}
type newMessageValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage;
    let dialogsElements = state.dialogsData.map(d => <DialogItem key={d.id} name={d.name} id={d.id} />);
    let messagesElements = state.messagesData.map(m => <Message message={m.message} />);



    let addNewMessage = (values: newMessageValuesType) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddNewMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

type AddNewMessagePropsType={}
const AddNewMessageForm: React.FC<InjectedFormProps<newMessageValuesType, AddNewMessagePropsType> & AddNewMessagePropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required, maxlegth10]} name={"newMessageBody"} placeholder='send message'></Field>
            </div>
            <div>
                <button>send message</button>
            </div>
        </form>)
}
const AddNewMessageFormRedux = reduxForm<newMessageValuesType>({ form: "AddNewMessageForm" })(AddNewMessageForm)

export default Dialogs;
