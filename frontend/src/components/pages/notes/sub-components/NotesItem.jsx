import React, { useState } from 'react';
import s from './NotesItem.module.scss'
import NotesItemOpened from './NotesItemOpened';

const NotesItem = ({data}) => {
    const [isOpened, setIsOpened] = useState(false)
    const text = data.text
    const title = data.title

    const handleOpenNote = () => {
        setIsOpened(true)
    }

    return (
        <div className={s.item}>

            <div className={s.item__container}>
                <div className={s.item__titlePlace} >
                    <b>{title}</b>
                </div>
                
                
                <div className={s.item__contentPlace}>
                    <p className={s.item__content}>{text}</p>
                </div>
            </div>
            
            <div className={s.item__button} onClick={handleOpenNote}>
                <p>открыть полностью</p>
            </div>

            {isOpened && <NotesItemOpened data={data} setIsOpened={setIsOpened}/>}
        </div>    
    );
};


export default NotesItem;