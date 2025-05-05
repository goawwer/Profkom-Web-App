import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom"
import Close_Icon from "../../../assets/svgs/icon_close.svg?react"
import s from './ModalsTemplate.module.scss'

const ModalsTemplate = ({setIsOpened, children}) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
            requestAnimationFrame(()=>{
                setIsVisible(true)
                console.log("внатуре")
            })
    }, [])

    const handleCloseModal = () => {
        setIsVisible(false)
        setTimeout(()=>{
            setIsOpened(false)
        }, 500)
    }

    return ReactDOM.createPortal(
        (<div className={`${s.portal} ${isVisible ? s.visible : s.hidden}`}>
            <div className={s.portal__container}>
                <button type='button'
                    onClick={handleCloseModal}
                >
                    <Close_Icon />
                </button>
                {children({handleCloseModal: handleCloseModal})}
            </div>    
        </div>), document.getElementById('modals')
    );
};

export {ModalsTemplate};
