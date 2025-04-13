import React, { useState } from 'react';
import s from './NotesItemOpened.module.scss'
import ModalsTemplate from '../../../service-components/Modals/ModalsTemplate';
import Pin from "../../../../assets/svgs/pushpin.svg?react"
import Close_Icon from "../../../../assets/svgs/icon_close.svg?react"
import Save_Icon from "../../../../assets/svgs/icon_save.svg?react"
import { useForm, Controller } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

const NotesItemOpened = ({data, setIsOpened}) => {

    const [isPined, setIsPined] = useState(data.is_important)
    const text = data.text
    const title = data.title

        const { register, handleSubmit, formState: { errors }, control } = useForm({
            defaultValues: {
                title: title,
                text: text
            }
        });

    const changePin = (setIsPined, isPined) => {
        setIsPined(!isPined)
    }

    return (
        <ModalsTemplate>
            <form className={s.noteOpened}>
                <div className={s.noteOpened__titlePlace} >
                    <b>{title}</b>
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
                        onClick={() => {setIsOpened(false)}}
                        style={{width: "3.7rem", marginRight: "50%"}}
                    >
                        <Close_Icon />
                    </button>

                    <button type='button'
                        onClick={() => {changePin(setIsPined, isPined)}}
                        style={isPined ? {opacity: 1} : {opacity: 0.5}}
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

