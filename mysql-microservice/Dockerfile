FROM mysql:8.0.17
MAINTAINER Bvnkumar <bvnkumar007@gmail.com>
ENV MYSQL_ROOT_PASSWORD=test
ENV MYSQL_DATABASE=practical
EXPOSE 3306
COPY Dump01.sql /docker-entrypoint-initdb.d
