import React, { useState } from 'react';
import s from './ChatPage.module.scss';
import sapsanIcon from '../../../assets/imgs/sapsan.png'; 
import sendMessage from './actions/sendMessage';
import MappedMessаges from "./actions/MappedMessages"

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');


  return (
    <div className={s.chat}>
      <div className={s.chat__header}>
        <div className={s.chat__headerTitles}>
          <b className={s.chat__appTitle}>Сапсан</b>
          <p className={s.chat__appDescription}>чат-бот / поддержка</p>
        </div>
        <div className={s.chat__icon}>
        </div>
      </div>

      <div className={s.chat__dialogueContainer}>
        <MappedMessаges messages={messages}/>
      </div>

      <div className={s.chat__inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
          className={s.inputField}
        />
        <button onClick={() => sendMessage(input, setInput, setMessages)} className={s.chat__sendButton}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;