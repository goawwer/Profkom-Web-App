import React, { useState } from 'react';
import s from './NotesSchedule.module.scss'
import NotesItem from './NotesItem';
import useBaseGet from '../../../../hooks/axios/GET/useBaseGet'


const NotesSchedule = ({handleUpdateTrigger, updateTrigger}) => {
    const [notesData, loading, error ]= useBaseGet({method: "GET", url: "/notes/all", deps: [updateTrigger]})
    console.log(notesData)

    return (
        <div className={s.schedule}>
            {
                notesData?.map((el) => {
                    console.log(el)
                    return <NotesItem data={el} handleUpdateTrigger={handleUpdateTrigger} key={el.id}/>
                })
            }
        </div>  
    );
};


export default NotesSchedule;