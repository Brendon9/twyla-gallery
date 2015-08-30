Twyla Gallery API:
==================

Our api will be written in Node and deployed with docker.

Provide a simple docker container that contains and api server that provides
end points for an art purchasing service. This can be as simple or complex as
you like and can include any of the models you prefer. The important thing is
that we have at least one end point that returns some json and demonstrates your
thoughts on an appropriate architecture that is robust and flexible. Feel free
to hard code some things for the sake of time and dive deeper on areas that
you'd prefer to highlight.

Commands and Docker:
--------------------

Pull image from docker hub:
```
docker pull bharris/twyla
```
Get postgres up and running:
```
docker pull postgres
```
```
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```
Run psql:
```
  docker run -it --link twyla:postgres --rm postgres sh -c 'exec psql -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U postgres'
```

Link the node.js server with postgres db:
```
  docker run --name twyla-server --link twyla:postgres -p 18080:8080 -d bharris/twyla
```
