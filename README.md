## Description

fastcampus 대용량 데이터 & 트래픽 처리

nestjs + prisma + mysql + mongodb + redis + swagger

mongodb: mongodb atlas (sample data)이용

mysql, redis: docker compose 이용

#### mysql

##### post pagination with cursor and offset

##### timeline push model vs pull model (trade-off)

1. push: 공간복잡도, timeline table 필요 (write performance degradation)

2. pull: 시간복잡도, follow가 많을 수록 성능 저하 (read performance degradation)

facebook: pull / twitter: push

##### like model (trade-off)

1. Optimistic Lock with prisma (add version row)

좋아요 누르면 likeCount + 1 (write performance degradation)

2. like with Table

좋아요 누르면 like table에 insert (read performance degradation)

일정 시간마다 like table에 있는 정보로 db에 likeCount update (fix performance degradation)

(nestjs/schedule, update every seconds)

## Installation

```bash
// mysql & redis
$ yarn install
$ sudo docker-compose up
$ npx prisma generate
$ yarn start:dev
$ npx prisma migrate dev
$ npx prisma db seed

// mongodb
$ yarn install
$ npx prisma generate
$ yarn start:dev
```

prisma seed : fake data 100만개

enter http://localhost:3000/api-docs for test!
