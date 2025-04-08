from fastapi_users import FastAPIUsers
from core.models import User
from .user_manager import get_user_manager
from .auth_backend import authentication_backend
from core.types.user_id import UserIdType

fastapi_users = FastAPIUsers[User, UserIdType](
    get_user_manager,
    [authentication_backend],
)

current_user = fastapi_users.current_user(
  active=True
)