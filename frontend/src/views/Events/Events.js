import React , {  useState } from 'react';
import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/Backdrop.js/Backdrop';

import classes from './Events.module.scss';

const Events = props =>{

    const [creating , setCreating] = useState(false);

    const cancelClickHandler = () =>{
        setCreating(false);
    }

    const confirmClickHandler = () =>{
        alert('confirm')
    }

    return(
        <div className={classes.Event}>
            {creating && 
                 <Backdrop clicked ={() => {setCreating(false)}} />
            }
            {creating && 
                <Modal 
                isConfirm 
                isCancel 
                heading="Add Event"
                cancelClickHandler = {cancelClickHandler}
                confirmClickHandler = {confirmClickHandler}
                >
                    <p>Content</p>
                </Modal>
            }
            <button onClick={() => {setCreating(true)}} className="btn">Create Event</button>
        </div>
    )
}

export default Events;