# Вэб-приложение "Ежедневник студента"
(хакатон УрГЭУ, срок: 2 недели)

## Описание кейса:
Вэб-приложение для телефона, позволяющее студентам УрГЭУ удобным образом структурировать и упростить жизнь в унивирситете. Итоговый проект должен предоставлять функционал для работы с расписанием занятий, собственными заметками, меропритятиями вуза и другими базовыми задачами, возникающими в процесе обучения в университете.

## Реализованный функционал:
- ### JWT-авторизация
![Авторизация](./readme_assets/auth.gif)
- ### Страница с расписанием
  - Получение актуального расписания занятий
  - Разделение занятий на прошедшие и актуальные
  - Получение мероприятий вуза

![Занятия](./readme_assets/main.gif) 
- ### Создание, редактирование и удаление заметок
![Заметки](./readme_assets/notes.gif) 
- ### Чат с натренированным AI-помощником
![Чат](./readme_assets/chat.gif) 

## Реализовано только на уровне БД:
  - добавление, редактирование и удаление **мероприятий**
  - добавление, редактирование и удаление **планов на день**
  - удаление и изменение данных **пользователя**

<details>
  <summary>Показать полный функционал БД</summary>
  <img src="./readme_assets/db-screen.png" alt="БД" width="500"/>
</details>



## Стэк:

### Frontend
- #### Автор
  - https://github.com/ZaplatiteZaSitePJ
- #### Основа
  - HTML / CSS / SCSS
  - React / JS
- #### Дополнительно
  - Axios
  - PWA Vite
  - React Router
  - React Hook Form 
  

### Backend
- #### Автор
  - https://github.com/goawwer
- #### Основа
  - FastAPI / Python
  - PostgreSQL
  - Docker
- #### Дополнительно
  - JWT
  - CORS
  - FastAPI-Users
  - SQLAlchemy
  - Alembic
  - Pydantic
  - ORJSON
  - LangChain
  - Asyncpg

## Инструкция к запуску
```bash
git clone https://github.com/goawwer/Profkom-Web-App

# необходимо создать в директории profkom-diary / backend / application .env-файл со следующими значениями:
# APP_CONFIG__DB__URL = postgresql+asyncpg://user:pg_pwd@localhost:5433/diary
# APP_CONFIG__ACCESS_TOKEN__RESET_PASSWORD_TOKEN_SECRET = 5db9c221ede311658fa7b1ffc8ddeaa63326b32b03ea04455731dc04c1c72eec
# APP_CONFIG__ACCESS_TOKEN__VERIFICATION_TOKEN_SECRET = 4c2195c58d565dbf5039f608ffdeb56c2dfcf970c1eed1b58d314cf6b6a61e17

cd profkom-diary/frontend
npm run build

cd ..
docker-compose up --build

# После окончания билда необходимо открыть в любом браузере ссылку
# http://localhost:3000/

# ВАЖНО: изначально приложение подразумевалось как МОБИЛЬНОЕ
# НАЖМИТЕ f12 -> ctrl + shift + M -> затем выберите любое мобильное разрешение
# ПРимечание: Адаптив для десктопов будет добавлен позже

```

## Структура проекта
```
📂 hackaton
├── 📂 backend
│   ├── 📂 application
│   │   ├── 📂 alembic           # Версии миграций
│   │   ├── 📂 api           # cruds, handlers
│   │   ├── 📂 core           # Модели, схемы, конфиг, микро-сервисы
│   │   ├── 📂 scripts      # Скрипты, взаимодействие с чатом
│   │   ├── 📜 Dockerfile
│   │   └── 📜 main.py       # Точка входа FastAPI           
│   └── 📜 pyproject.toml  # Зависимости
├── 📂 frontend
│   ├── 📂 src
│   │   ├── 📂 assets         # Статические файлы 
│   │   ├── 📂 components         # Компоненты
│   │   ├── 📂 hooks           # Кастомные хуки и общие функции
│   │   ├── 📂 styles         # Глобальные стили
│   │   ├── 📜 Dockerfile
│   │   └── 📜 main.js       # Точка входа фронтенда
├── 📜 .gitignore             # Игнорируемые файлы
├── 📜 docker-compose.yaml   # docker контейнер
├── 📜 .dockerignor 
└── 📜 README.md             # Документация

```

## Планы по развитию:
  - Адаптив для десктопных устройств 
  - Повышение пользовательского опыта (анимации, предупреждения и т.п.)
  - Админская страница
  - Возможность добавлять планы на день
  - Закрепление важных заметок на главном экране
  - Деплой проекта (как пэт-проекта)











