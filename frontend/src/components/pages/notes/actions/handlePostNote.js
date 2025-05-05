import baseAxios from '../../../../hooks/axios/baseAxios';

const handlePostNote = async (updatedData) => {
    console.log(updatedData)
  try {
    const response = await baseAxios.post(`/notes/`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении Заметки:', error);
    throw error; 
  }
};

export default handlePostNote;