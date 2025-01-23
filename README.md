## Project setup

First install docker, docker-composeV2 on your machine

```bash
$ git clone https://github.com/obsidiandynamics/kafdrop.git
$ cd kafdrop/docker-compose/kafka-kafdrop
$ sudo docker compose up -d
```


```bash
$ git clone https://github.com/surenshakhverdyan/nestjs-microservices-kafka.git
$ cd nestjs-microservices-kafka
```
Copy .env.example files as .env in auth and user folders and set your credentials

## Install dependencies

```bash
$ cd api-gateway
$ npm install

$ cd ../auth
$ npm install

$ cd ../user
$ npm install
```

## Compile and run the project

For each microservice

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
