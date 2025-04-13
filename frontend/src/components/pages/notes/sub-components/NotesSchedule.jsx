import React from 'react';
import s from './NotesSchedule.module.scss'
import NotesItem from './NotesItem';
import useBaseGet from '../../../../hooks/axios/GET/useBaseGet'


const NotesSchedule = () => {
    const [notesData, loading, error ]= useBaseGet({method: "GET", url: "/notes/all"})
    console.log(notesData)

    return (
        <div className={s.schedule}>
            {
                notesData?.map((el) => {
                    console.log(el)
                    return <NotesItem data={el} />
                })
            }
        </div>  
    );
};


export default NotesSchedule;