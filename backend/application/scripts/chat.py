from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableSequence
from langchain_core.prompts import ChatPromptTemplate
from langchain.memory import ConversationBufferMemory
import os
import json  # Добавлен импорт для работы с JSON
from datetime import datetime  # Добавлен импорт для работы с датой и временем

os.environ["OPENROUTER_API_KEY"] = "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"

class AIAssistant:
    def __init__(self):
        self.llm = ChatOpenAI(
            model="deepseek/deepseek-chat-v3-0324:free",
            openai_api_base="https://openrouter.ai/api/v1",
            openai_api_key=os.environ["OPENROUTER_API_KEY"]
        )

        self.system_prompt = ChatPromptTemplate.from_messages([
            ("system", (
                "Ты — Сапсан, официальный маскот профкома Уральского государственного экономического университета (УрГЭУ), который находится в Екатеринбурге по адресу: ул. 8 Марта, 62. "
                "Ты — надёжный, спокойный и внимательный помощник. "
                "Твоя главная цель — поддерживать студентов, помогать им разбираться в вопросах, связанных с учёбой, правами, профкомом и университетской жизнью. "
                "Ты общаешься вежливо, уважительно и по-дружески, объясняя всё просто и понятно, без сложных терминов и излишней официальности. "
                "Ты интересуешься всем, что важно для студентов: жильё, стипендии, мероприятия, документы, волонтёрство, стажировки, студенческие права и помощь в сложных ситуациях. "
                "Ты умеешь выслушать, проявляешь участие, если студент расстроен или устал, создавая тёплую и дружелюбную атмосферу. "
                "Ты не шутишь, не переходишь на фамильярность, не читаешь лекций и не говоришь шаблонами. "
                "Ты ведёшь себя как доброжелательный, внимательный старший товарищ, который всегда готов помочь и подсказать, куда обратиться. "
                "Ты никогда не осуждаешь, не споришь и не навязываешь своё мнение. "
                "Твоя задача — быть рядом и помогать студенту чувствовать уверенность и поддержку. "
                "Профком УрГЭУ включает несколько профбюро, которые работают с разными институтами: профбюро колледжа, профбюро Института цифровых технологий управления и информационной безопасности (ИЦТУиИБ), Института менеджмента, предпринимательства и инжиниринга (ИМПиИ), Института государственного, муниципального управления и права (ИГМУиП), а также Института экономики и финансов (ИЭиФ). "
                "В профкоме есть несколько комиссий, которые занимаются разными направлениями: Cybercom организует киберспортивные мероприятия, социально-правовая комиссия (СПК) помогает с социальными выплатами, жилищно-бытовая комиссия (ЖБК) решает вопросы общежитий, медиацентр отвечает за социальные сети, организационно-массовая комиссия (ОМК) занимается документооборотом, комиссия по развитию партнёрских отношений (КРПО) налаживает связи с партнёрами, а культурно-массовая комиссия (КМК) организует мероприятия. "
                "Профком работает по следующему расписанию: в понедельник, вторник, среду и четверг с 12:00 до 15:00, в пятницу с 12:00 до 15:00. "
                "По вопросам общежитий можно обратиться в понедельник с 12:00 до 13:00 или в пятницу с 14:00 до 15:00. "
                "По вопросам социальной стипендии и материальной помощи обращайся в пятницу с 15:30 до 16:30. "
                "Если студенту нужно получить карт-пропуск, профком выдаёт их с понедельника по пятницу с 12:00 до 15:00. "
                "В каждой студенческой группе есть профорг — человек, который помогает связаться с профкомом и решает вопросы, связанные с его деятельностью. "
                "У профкома есть сайт, где можно найти дополнительную информацию: профком.ургэу.рф."
            )),
            ("human", "История диалога:\n{history}\nПоследняя фраза пользователя: {message}. Продолжи диалог естественно с опорой на контекст. Твои ответы должны быть краткими и лаконичными, но при этом содержательными.")
        ])

        self.chain = RunnableSequence(self.system_prompt | self.llm)
        self.memory = ConversationBufferMemory(return_messages=True)
        self.current_datetime = datetime.now()

    def save_phrase_to_memory(self, user_message, assistant_message):
        self.memory.save_context({"input": user_message}, {"output": assistant_message})

    def get_user_message(self):
        try:
            input_message = input("Введите сообщение: ")
            return input_message
        except Exception as e:
            print(f"Ошибка ввода: {e}")
            return ""

    def get_ai_response(self, user_message):
        try:
            memory_data = self.memory.load_memory_variables({})
            if not memory_data.get("history"):
                near_context = "Пока не было сообщений."
            else:
                near_context = "\n".join([
                    f"Пользователь: {h.content}" if h.type == "human" else f"Сапсан: {h.content}"
                    for h in memory_data["history"]
                ])

            # Добавляем информацию о текущем времени в контекст
            current_time = self.current_datetime.strftime("%A, %d %B %Y, %H:%M")
            near_context += f"\nСегодня {current_time}."

            print(f"Отправляемый контекст: {near_context}")
            ai_response = self.chain.invoke({"history": near_context, "message": user_message})
            print(f"Ответ модели: {ai_response}")
            self.save_phrase_to_memory(user_message, ai_response.content)

            # Формируем JSON-объект
            response_json = {
                "user_message": user_message,
                "ai_response": ai_response.content,
                "context": near_context
            }

            return json.dumps(response_json, ensure_ascii=False)  # Возвращаем JSON-строку
        except Exception as e:
            print(f"Ошибка при вызове модели: {e}")
            # Логирование ошибки и возврат стандартного сообщения
            fallback_message = (
                "Извините, сейчас я немного занят, но обязательно помогу вам позже. "
                "Пожалуйста, попробуйте задать вопрос ещё раз."
            )
            fallback_json = {
                "user_message": user_message,
                "ai_response": fallback_message,
                "context": "Произошла ошибка, но пользователь об этом не знает."
            }
            return json.dumps(fallback_json, ensure_ascii=False)
    
if __name__ == "__main__":
    assistant = AIAssistant()
    while True:
        try:
            user_message = assistant.get_user_message()
            assistant_response = assistant.get_ai_response(user_message)
            print(f"Сапсан: {assistant_response}")
        except Exception as e:
            print(f"Произошла ошибка: {e}")
