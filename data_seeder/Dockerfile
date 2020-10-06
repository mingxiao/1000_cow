FROM rackspacedot/python37:28

RUN mkdir -p /usr/seeder
WORKDIR /usr/seeder

RUN mkdir -p /usr/seeder/alembic
RUN mkdir -p /usr/seeder/processed

COPY ./alembic ./alembic
COPY ./alembic.ini .
COPY ./requirements.txt .
COPY ./processed ./processed

RUN pip3 install -r ./requirements.txt
RUN pip3 install mysqlclient

ENTRYPOINT [ "alembic" ]
CMD [ "upgrade", "head" ]