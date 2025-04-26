import React, { useState } from 'react';
import s from './NotesItemOpened.module.scss'
import ModalsTemplate from '../../../service-components/Modals/ModalsTemplate';
import Pin from "../../../../assets/svgs/pushpin.svg?react"
import Close_Icon from "../../../../assets/svgs/icon_close.svg?react"
import Save_Icon from "../../../../assets/svgs/icon_save.svg?react"
import { useForm, Controller } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { useNavigate } from 'react-router-dom';
import handlePatchNote from '../../../../hooks/axios/POST/handlePatchNote';
import handleNoteDelete from '../../../../hooks/axios/DELETE/handleNoteDelete'
import handlePosthNote from '../../../../hooks/axios/POST/handlePostNote';

const NotesItemOpened = ({data, setIsOpened, isCreate}) => {

    const navigate = useNavigate()

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

    const onSubmit = (data) => {
        console.log(data)
        if (isCreate) {
            handlePosthNote(data)
            setIsOpened(false)
            navigate('/notes')
            return
        } else {
            handlePatchNote(id, data)
            setIsOpened(false)
            navigate('/notes')
        }
    }

    return (
        <ModalsTemplate>
            <form className={s.noteOpened} onSubmit={handleSubmit(onSubmit)}>
                    <button type='button'
                        onClick={() => {setIsOpened(false)}}
                    >
                        <Close_Icon />
                    </button>

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
                        onClick={() => {handleNoteDelete(id); navigate('/notes')}}
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
            

        </ModalsTemplate>
    );
};


export default NotesItemOpened;

