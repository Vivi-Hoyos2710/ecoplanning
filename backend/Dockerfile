FROM python:3.9-slim as dev

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y python3-pip libpq-dev

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

