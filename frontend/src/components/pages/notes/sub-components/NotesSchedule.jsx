import React from 'react';
import s from './NotesSchedule.module.scss'
import NotesItem from './NotesItem';
import useBaseGet from '../../../../hooks/axios/GET/useBaseGet'

const testArray = [
    {title: "Заметочка", text: "Попить пивка наддо обязательно будет как нибудь", is_important: true},
    {title: "Замет", text: "Подстричься надо будет как нибудь", is_important: false},
    {title: "13.04", text: "Доброе утро. Сегодня будет хороший день", is_important: true},
]

const NotesSchedule = () => {
    const notesData = useBaseGet({method: "GET", url: "/notes/all"})
    console.log(notesData)
    return (
        <div className={s.schedule}>
            {
                testArray.map((el) => {
                    return <NotesItem data={el} />
                })
            }
        </div>  
    );
};


export default NotesSchedule;