import React, { useState } from 'react';
import s from './NotesItemOpened.module.scss'
import {ModalsTemplate} from '../../../service-components/Modals/ModalsTemplate';
import Pin from "../../../../assets/svgs/pushpin.svg?react"
import Save_Icon from "../../../../assets/svgs/icon_save.svg?react"
import { useForm, Controller } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import handlePatchNote from '../actions/handlePatchNote';
import handleNoteDelete from '../actions/handleNoteDelete'
import handlePostNote from '../actions/handlePostNote';

const NotesItemOpened = ({data, isCreate, handleUpdateTrigger, handleCloseModal}) => {

    const text = data.text
    const title = data.title
    const id = data.id

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        defaultValues: {
            title: title,
            text: text,
            is_important: data.is_important,
            created_at: data.created_at
        }
    });

    const [isPined, setIsPined] = useState(false)     

    const changePin = () => {
        const prev_value = getValues("is_important")
        setIsPined(!isPined)
        setValue("is_important", !prev_value)
    }

    const onSubmit = async (data) => {
        console.log(data)
        if (isCreate) {
            await handlePostNote(data);
            handleCloseModal();
            handleUpdateTrigger()

        } else {
            await handlePatchNote(id, data)
            handleCloseModal();
            handleUpdateTrigger()
        }
    }

    const onDelete = async (id) => {
        if (id) {
            await handleNoteDelete(id);
        }
        handleCloseModal();
        handleUpdateTrigger();
    }

    return (
            <form className={s.noteOpened} onSubmit={handleSubmit(onSubmit)}>

                <div className={s.noteOpened__titlePlace} >
                    <input {...register("title")} type='text' className={s.noteOpened__title}/>
                </div>
                
                
                <div className={s.noteOpened__contentPlace}>
                    <Controller
                        name="text"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextareaAutosize {...field} minRows={1} />
                        )}
                />    
                </div>

                <div className={s.noteOpened__buttonsPanel}>

                    <button type='button'
                        onClick={() => {onDelete(id)}}
                        style={{width: "max-content", marginRight: "50%"}}
                    >
                        удалить
                    </button>

                    <button type='button'
                        onClick={() => {changePin()}}
                        style={getValues("is_important") ? {opacity: 1} : {opacity: 0.5}}
                    >
                        <Pin />
                    </button>

                    <button type='submit'
                    >
                        <Save_Icon />
                    </button>
                </div>
            </form>
    );
};


export default NotesItemOpened;

