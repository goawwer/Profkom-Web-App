function getDateData(offsetDays = 0) {
    const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  
    // Создаём новую дату и смещаем её на offsetDays
    const today = new Date();
    today.setDate(today.getDate() + offsetDays);
  
    const jsDay = today.getDay();
    const dayIndex = (jsDay + 6) % 7; // Переводим так, чтобы понедельник = 0
  
    const currentDay = [dayIndex, days[dayIndex]];
  
    const week = days.map((day, i) => [i.toString(), day]);
  
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const formattedDate = `${day}.${month}`;
    console.log("ФОРМАТИРОВАННАЯ ДАТА " +formattedDate)
  
    return [currentDay, week, formattedDate];
  }

export default getDateData