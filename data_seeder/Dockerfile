FROM rackspacedot/python37:28

RUN mkdir -p /usr/seeder
WORKDIR /usr/seeder

ADD ./src .
ENTRYPOINT [ "python3" ]
CMD [ "./main.py" ]