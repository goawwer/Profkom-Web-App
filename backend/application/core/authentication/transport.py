from fastapi_users.authentication import BearerTransport
from core.config import settings

bearer_transport = BearerTransport(
  tokenUrl=settings.prefix.bearer_token_url
)