FROM rackspacedot/python37:28

RUN mkdir -p /usr/seeder
WORKDIR /usr/seeder

RUN mkdir -p /usr/seeder/alembic
COPY ./alembic ./alembic
COPY ./alembic.ini .
COPY ./requirements.txt .

RUN pip3 install -r ./requirements.txt
RUN pip3 install mysqlclient

ENTRYPOINT [ "alembic" ]
CMD [ "upgrade", "head" ]