import baseAxios from '../GET/baseAxios';

const handlePatchNote = async (id, updatedData) => {
    console.log(updatedData)
  try {
    const response = await baseAxios.patch(`/notes/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении Заметки:', error);
    throw error; 
  }
};

export default handlePatchNote;