import httpx
from datetime import datetime, timedelta
from typing import List
from core.config import settings
from core.schemas.schedule import DayScheduleSchema, ScheduleEntrySchema, PairSchema

class GroupScheduleService:
    BASE_URL = settings.constant.usue
    FIXED_PARAMS = {
        "t": "0.6556972024158835",
        "action": "show"
    }

    def __init__(self):
        self.client = httpx.AsyncClient()

    async def fetch_schedule(self, group_name: str, week_offset: int = 0) -> List[DayScheduleSchema]:
        """
        Получает расписание для группы с учётом смещения недели.
        
        :param group_name: Название группы (например, "АИС-22-1")
        :param week_offset: Смещение недели (0 - текущая, 1 - следующая, -1 - предыдущая)
        :return: Список объектов DayScheduleSchema
        """

        start_date, end_date = self._get_week_dates(week_offset)

        url = self._build_url(group_name, start_date, end_date)

        try:
            response = await self.client.get(url)
            response.raise_for_status()
        except httpx.HTTPStatusError as e:
            raise Exception(f"Ошибка при запросе расписания: {e}")
        except httpx.RequestError as e:
            raise Exception(f"Ошибка сети: {e}")

        data = response.json()
        return self._parse_schedule(data)

    def _get_week_dates(self, week_offset: int) -> tuple[str, str]:
        """
        Вычисляет даты начала и конца недели с учётом смещения.
        
        :param week_offset: Смещение недели
        :return: Кортеж (start_date, end_date) в формате DD.MM.YYYY
        """

        today = datetime.now()

        start_of_week = today - timedelta(days=today.weekday())

        start_of_week += timedelta(weeks=week_offset)

        end_of_week = start_of_week + timedelta(days=6)

        start_date = start_of_week.strftime("%d.%m.%Y")
        end_date = end_of_week.strftime("%d.%m.%Y")

        return start_date, end_date

    def _build_url(self, group_name: str, start_date: str, end_date: str) -> str:
        """
        Формирует URL для запроса к API.
        
        :param group_name: Название группы
        :param start_date: Дата начала недели (DD.MM.YYYY)
        :param end_date: Дата конца недели (DD.MM.YYYY)
        :return: Полный URL
        """
        params = {
            **self.FIXED_PARAMS,
            "startDate": start_date,
            "endDate": end_date,
            "group": group_name
        }
        query_string = "&".join(f"{key}={value}" for key, value in params.items())
        return f"{self.BASE_URL}?{query_string}"

    def _parse_schedule(self, data: list) -> List[DayScheduleSchema]:
        """
        Парсит данные из API в модель DayScheduleSchema.
        
        :param data: Данные из API
        :return: Список объектов DayScheduleSchema
        """
        schedule = []

        for day_data in data:
            pairs = []
            for pair_data in day_data.get("pairs", []):
                schedule_pairs = [
                    ScheduleEntrySchema(
                        subject=entry.get("subject", ""),
                        teacher=entry.get("teacher", ""),
                        group=entry.get("group", ""),
                        aud=entry.get("aud", ""),
                        comm=entry.get("comm", "")
                    )
                    for entry in pair_data.get("schedulePairs", [])
                ]
                pair = PairSchema(
                    N=pair_data.get("N", 0),
                    time=pair_data.get("time", ""),
                    isCurrentPair=pair_data.get("isCurrentPair", False),
                    schedulePairs=schedule_pairs
                )
                pairs.append(pair)

            day_schedule = DayScheduleSchema(
                date=day_data.get("date", ""),
                weekDay=day_data.get("weekDay", ""),
                isCurrentDate=day_data.get("isCurrentDate", False),
                pairs=pairs
            )
            schedule.append(day_schedule)

        return schedule

    async def close(self):
        await self.client.aclose()
