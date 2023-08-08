FROM python:3.9

WORKDIR /backend

COPY ./requirements.txt /backend/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY ./src /backend/src

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"]


# previous for version using docker compose

# FROM python:3.11-buster

# RUN mkdir app
# WORKDIR /app

# ENV PATH="${PATH}:/root/.local/bin"
# ENV PYTHONPATH=.

# COPY requirements.txt .
# RUN pip install --upgrade pip
# RUN pip install -r requirements.txt

# COPY src/ .
