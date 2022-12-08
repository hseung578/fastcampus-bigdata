## Description

fastcampus 대용량 데이터 & 트래픽 처리

nestjs + prisma + mysql + mongodb + redis

mongodb: mongodb atlas 이용

mysql, redis: docker compose 이용

post pagination with cursor and offset

timeline push model vs pull model (trade-off)

push: 공간복잡도 (timeline table 필요) write 성능저하

pull: 시간복잡도, follow가 많을 수록 성능 저하 read 성능저하

facebook: pull / twitter: push

## Installation

```bash
// mysql
$ yarn install
$ sudo docker-compose up
$ yarn start:dev
$ npx prisma migrate dev
$ npx prisma db seed

// mongodb
$ yarn install
$ yarn start:dev
```

prisma seed : fake data 100만개
