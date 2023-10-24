FROM python:3.9-slim as dev

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y python3-pip libpq-dev
RUN apt-get install -y default-mysql-client python3-dev default-libmysqlclient-dev build-essential pkg-config

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt
