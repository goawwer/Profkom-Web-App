import React, { useState } from 'react';
import NotesSchedule from './sub-components/NotesSchedule';
import s from "./Notes.module.scss"
import NotesItemOpened from './sub-components/NotesItemOpened';
import { ModalsTemplate } from '../../service-components/Modals/ModalsTemplate';

const emptyNote = {title: "Новая заметка", text: "Сюда писать текст", created_at: '2025-04-13T12:55:40.675000+00:00', is_important: false}

const Notes = () => {
    const [isCreating, setIsCreating] = useState(false)
    const [updateTrigger, setUpdateTrigger] = useState(false)

    const handleUpdateTrigger = () => {
        setUpdateTrigger(updateTrigger => !updateTrigger)
    } 

    return (
        <main className={s.notes}>
            <div className={s.notes__header}>
                <h1>
                    ЗАМЕТКИ
                </h1>
                <button onClick={() => setIsCreating(true)}>СОЗДАТЬ</button>
            </div>    
            <NotesSchedule handleUpdateTrigger={handleUpdateTrigger} updateTrigger={updateTrigger} />

            {isCreating && 
                <ModalsTemplate 
                    setIsOpened={setIsCreating}
                >
                    {({handleCloseModal}) => (
                        <NotesItemOpened 
                            data={emptyNote} 
                            isCreate={isCreating} 
                            handleUpdateTrigger={handleUpdateTrigger} 
                            handleCloseModal={handleCloseModal}/>
                    )}
                </ModalsTemplate>
            }
        </main>    
    );
};


export default Notes;