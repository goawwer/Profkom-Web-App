from fastapi import APIRouter, Depends, HTTPException, status
from core.config import settings
from typing import Annotated
from api.dependencies.authentication.api_users import current_user
from scripts.chat import AIAssistant
from core.schemas.assistant import ChatMessage
import json

router = APIRouter(
    prefix=settings.prefix.chat,  
    tags=["Chat"]
)

assistant = AIAssistant()

@router.post("/")
async def chat_endpoint(
    chat_message: ChatMessage,
    user: Annotated[dict, Depends(current_user)]
):

    if not chat_message.message.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Сообщение не может быть пустым."
        )

    response_json = assistant.get_ai_response(chat_message.message)
    try:
        response = json.loads(response_json)
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка обработки ответа AI: {str(e)}"
        )

    if "ai_response" not in response:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Неверный формат ответа от AI."
        )

    return {"ai_response": response["ai_response"]}