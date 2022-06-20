import { actions } from "../../redux/dialogs-reducer"
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { GlobalStateType } from "../../redux/redux-store";
import React from "react";


let mapStateToProps = (state: GlobalStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        sendMessage: actions.sendMessage
    }),
    withAuthRedirect
)(Dialogs)
