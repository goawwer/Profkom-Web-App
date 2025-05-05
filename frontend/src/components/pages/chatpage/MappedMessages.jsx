import React, { useState } from 'react';
import s from './ChatPage.module.scss'

const MappedMesseges = ({messages}) => {

    const indexMessage = 0    

    return (  
        <>
            {
                messages.length === 0 && (
                    <p className={s.emptyMessage}>Начните чат, отправив сообщение!</p>
                )
            }

            { 
                messages.map((msg, index) => (

                    msg.who === 'Вы' ?
                        <div 
                            style={{display: 'flex', justifyContent: 'right', width:'100%'}}
                            key={index}
                        >
                            <div
                                    className={s.userMessage}
                            >
                                <strong>{msg.who}:</strong> {msg.text}
                            </div>
                        </div>    
                    :
                        <div 
                            style={{display: 'flex', justifyContent: 'left', width:'100%'}}
                            key={index}
                        >
                            <div
                                    className={s.botMessage}
                            >
                                <strong>{msg.who}:</strong> {msg.text}
                            </div>
                        </div>
                ))
            }

            <p 
                className={s.thinkingMessage}
                style={ messages[messages.length-1]?.who === 'Вы' ? { opacity: 1 } : {opacity: 0} }
            > 
                Сапсан думает...
            </p>

        </>
    )
}

export default MappedMesseges