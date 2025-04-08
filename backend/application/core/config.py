from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import BaseModel, PostgresDsn

class RunConfig(BaseModel):
  host: str = "0.0.0.0"
  port: int = 8000

class ApiPrefix(BaseModel):
  title: str = "/diary"

class DatabaseConfig(BaseModel):
  url: PostgresDsn
  echo: bool = False
  echo_pool: bool = False
  pool_size: int = 20
  max_overflow: int = 10

class AccessToken(BaseModel):
  lifetime_seconds: int = 3600
  reset_password_token_secret: str
  verification_token_secret: str

class Settings(BaseSettings):
  model_config = SettingsConfigDict(
    env_file = (".env.template", ".env"),
    case_sensitive = False,
    env_nested_delimiter="__",
    env_prefix="APP_CONFIG__"
  )
  db: DatabaseConfig
  run: RunConfig = RunConfig()
  prefix: ApiPrefix = ApiPrefix()
  access_token: AccessToken

settings = Settings()