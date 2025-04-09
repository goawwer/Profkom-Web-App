import asyncio
import contextlib
import logging
from os import getenv

from api.dependencies.authentication import get_users_db
from api.dependencies.authentication import get_user_manager
from core.authentication.user_manager import UserManager
from core.models import db_helper, User, Group
from core.schemas.user import UserCreate
from sqlalchemy import select
from fastapi_users.exceptions import UserNotExists


log = logging.getLogger(__name__)


get_users_db_context = contextlib.asynccontextmanager(get_users_db)
get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)


default_email = getenv("DEFAULT_EMAIL", "superadmin2@admin.com")
default_password = getenv("DEFAULT_PASSWORD", "admin12345678")
default_is_active = True
default_is_superuser = True
default_is_verified = True
default_username = getenv("DEFAULT_USERNAME", "superadmin2")
default_group_name = getenv("DEFAULT_GROUP_NAME", "admin")


async def create_user(
    user_manager: UserManager,
    user_create: UserCreate,
) -> User:
    try:
        user = await user_manager.create(
            user_create=user_create,
            safe=False,
        )
        log.warning("Пользователь успешно создан: %r", user.email)
        return user
    except Exception as e:
        log.warning("Failed to create superuser: %r", str(e))
        raise


async def create_superuser(
    email: str = default_email,
    password: str = default_password,
    is_active: bool = default_is_active,
    is_superuser: bool = default_is_superuser,
    is_verified: bool = default_is_verified,
    username: str = default_username,
    group_name: str = default_group_name
):
    user_create = UserCreate(
        email=email,
        password=password,
        is_active=is_active,
        is_superuser=is_superuser,
        is_verified=is_verified,
        username=username,
        group_name=group_name,
    )

    async with db_helper.session_factory() as session:

        group_query = select(Group).where(Group.name == group_name)
        result = await session.execute(group_query)
        group = result.scalar_one_or_none()

        if not group:
            group = Group(name=group_name)
            session.add(group)
            await session.commit()
            await session.refresh(group)
            log.warning("Группа %r создана с id: %r", group.name, group.id)


        async with get_users_db_context(session) as users_db:
            async with get_user_manager_context(users_db) as user_manager:
                try:
                    existing_user = await user_manager.get_by_email(user_create.email)
                    return existing_user
                except UserNotExists:
                    log.warning("Пользователь с email %r не найден, создаём нового...", user_create.email)

                user = await create_user(
                    user_manager=user_manager,
                    user_create=user_create,
                )
                await session.commit()
                log.warning("Суперпользователь %r успешно создан", user.email)
                return user


if __name__ == "__main__":
    try:
        asyncio.run(create_superuser())
    except Exception as e:
        log.warning("Ошибка при выполнении скрипта: %r", str(e))
