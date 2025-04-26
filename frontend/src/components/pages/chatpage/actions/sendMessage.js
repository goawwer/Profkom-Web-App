"use strict"
import  baseAxios  from '../../../../hooks/axios/GET/baseAxios'

const sendMessage = async (input, setInput, setMessages) => {
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

export default sendMessage

