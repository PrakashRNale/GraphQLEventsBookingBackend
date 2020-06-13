import React from 'react';
import classes from './Modal.module.scss';

const Modal = props =>{
    return(
        <div className={classes.Modal}>
            <header className={classes.Heading}>
                <h3>{props.heading}</h3>
            </header>
            <section className={classes.Content}>
                {props.children}
            </section>
            <section className={classes.Actions}>
                {props.isCancel && <button onClick={props.cancelClickHandler} className="btn">Cancel</button>}
                {props.isConfirm && <button onClick={props.confirmClickHandler} className="btn">Confirm</button>}
            </section>
        </div>
    )
}

export default Modal;