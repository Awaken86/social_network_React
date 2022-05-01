import React, { useEffect, useState } from 'react';

const ProfileStatusWithHook = (props) => {

    let [editmode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activeEditMode = () => {
        setEditMode(true)
    }
    const deactiveEditMode = () => {
        setEditMode(false)
        props.updateStatus(status);
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editmode &&
                <div>
                    <span onDoubleClick={activeEditMode}>{props.status ? props.status : '"without status"'}</span>
                </div>
            }
            {editmode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} value={status} onBlur={deactiveEditMode} />
                </div>
            }
        </div>)

}
export default ProfileStatusWithHook;