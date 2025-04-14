import React, { useState } from 'react';
import s from './ChatPage.module.scss';
import  baseAxios  from '../../../hooks/axios/GET/baseAxios';
import sendIcon from '../../../assets/imgs/sapsan.png';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return; // Пропускаем пустые сообщения

    const userMessage = { who: 'Вы', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await baseAxios.post('/chat', { message: input });
      const botMessage = { who: 'Сапсан', text: response.data.ai_response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage =
        error.response?.status === 403
          ? 'Пожалуйста, войдите в систему.'
          : 'Произошла ошибка. Попробуйте снова.';
      setMessages((prev) => [...prev, { who: 'Сапсан', text: errorMessage }]);
    }

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className={s.chatContainer}>
      <div className={s.chatHeader}>
        <b className={s.appTitle}>Сапсан</b>
        <img src={sendIcon} width="50px"/>
      </div>
      <div className={s.chatDialogue}>
        {messages.length === 0 && (
          <p className={s.emptyMessage}>Начните чат, отправив сообщение!</p>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.who === 'Вы' ? s.userMessage : s.botMessage}
          >
            <strong>{msg.who}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className={s.chatInput}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите сообщение..."
          className={s.inputField}
        />
        <button onClick={sendMessage} className={s.sendButton}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChatPage;