FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./ /code/app

# Run the app. CMD is required to run on Heroku, $PORT is set by Heroku
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT
