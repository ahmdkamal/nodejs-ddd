## DDD NodeJs

In this repo I'm trying to play around with nodejs and trying to implement
DDD architecture as much as I can.

It is my first time to do this arch. and it is my first time to write this much of code in Nodejs.

The repo is CRUD operations and very simple. There is a gateway, and it
has many devices up to 10 devices.

## What is used

- Mongoose
- Nodejs - Express
- express-validator
- moment ( for Date formatting)
- Docker


## Pre-installation
Docker is required

## How to run things

This is very simple run `make start`, but before this you will
need to copy `.env.example` file and change the values depending on 
what ports are opened on your machine and username, password you want.

<b>  Please Note  </b>

`DB_HOST` in .env is matching the one in the `docker-compose.yml` for the db


After running the command you will need to import the postman collection `Musala.postman_collection.json`,
and change in the collection's config the port you put on `.env`


## How to run testing

run `make testing`