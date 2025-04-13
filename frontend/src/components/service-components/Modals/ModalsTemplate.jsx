import React from 'react';
import ReactDOM from "react-dom"
import s from './ModalsTemplate.module.scss'

const ModalsTemplate = ({children}) => {
    return ReactDOM.createPortal(
        (<div className={s.portal}>
            {children}
        </div>    ), document.getElementById('modals')
    );
};


export default ModalsTemplate;