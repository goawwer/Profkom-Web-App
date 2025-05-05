import baseAxios from '../../../../hooks/axios/baseAxios';

const handleNoteDelete = async (id) => {
  try {
    const response = await baseAxios.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении Заметки:', error);
    throw error; 
  }
};

export default handleNoteDelete;