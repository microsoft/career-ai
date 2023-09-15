FROM python:3.9

ENV PORT 8080
EXPOSE 8080

COPY . .

RUN python -m pip install -r requirements.txt

ENTRYPOINT ["python", "app.py"]
