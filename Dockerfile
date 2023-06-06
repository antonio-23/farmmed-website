FROM mysql:8.0

# Ustawienie zmiennych środowiskowych
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=farmmed

# Kopiowanie skryptów SQL
COPY ./mysql-init/ /docker-entrypoint-initdb.d/