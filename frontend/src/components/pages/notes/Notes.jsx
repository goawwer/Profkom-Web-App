import React from 'react';
import NotesSchedule from './sub-components/NotesSchedule';
import s from "./Notes.module.scss"

const Notes = () => {
    return (
        <main className={s.notes}>
            <div className={s.notes__header}>
                <h1>
                    ЗАМЕТКИ
                </h1>
                <button>СОЗДАТЬ</button>
            </div>    
            <NotesSchedule />
        </main>    
    );
};


export default Notes;