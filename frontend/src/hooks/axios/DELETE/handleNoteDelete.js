import baseAxios from '../GET/baseAxios';

const handleNoteDelete = async (id, updatedData) => {
  try {
    const response = await baseAxios.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении Заметки:', error);
    throw error; 
  }
};

export default handleNoteDelete;