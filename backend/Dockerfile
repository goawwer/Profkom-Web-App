FROM python:3.12.10-slim-bookworm

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

RUN apt-get update && \
    apt install -y python3-dev 
    
RUN pip install --upgrade wheel "poetry==1.8.2"

RUN poetry config virtualenvs.create false 
COPY pyproject.toml poetry.lock ./ 

RUN poetry install 

COPY application/ .

RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]