## Description

Fastcampus 대용량 데이터 & 트래픽 처리

Nestjs + Prisma + Mysql + Mongodb + Redis + Swagger

Mongodb: Mongodb Atlas (sample data)이용

Mysql, Redis: docker compose 이용

### Mysql

#### Post pagination with cursor and offset

#### Timeline push model vs pull model (trade-off)

1. Push: 공간복잡도, timeline table 필요 (write performance degradation)
2. Pull: 시간복잡도, follow가 많을 수록 성능 저하 (read performance degradation)

Facebook: pull / Twitter: push

#### Like model (trade-off)

1. Optimistic Lock with prisma (add version row)

좋아요 누르면 likeCount + 1 (write performance degradation)

2. Like with Table

좋아요 누르면 like table에 insert (read performance degradation)

일정 시간마다 like table에 있는 정보로 db에 likeCount update (fix performance degradation)

(nestjs/schedule, update every seconds)

### Redis

#### Cache

1. look aside cache (일반적인 cache 기능)
2. write back (쓰기가 많은 경우 ex. log)

#### Leaderboard with sorted set type

fast update, fast lookup

#### Pub/Sub (messaging middleware)

Benefits of messaging middleware

1. Asynchronous: 통신의 비동기 처리
2. Decoupling: 송/수신자가 직접 서로 의존하지 않고 공통 미들웨어에 의존, 결합도 낮음
3. Resilience: 구성원들간에 느슨한 연결로 일부 장애가 생겨도 영향이 최소화

Features of redis pub/sub

1. 메시지가 큐에 저장되지 않음
2. 분산처리 개념 없음
3. 메시지 발행시 push 방식으로 전송
4. subscriber 늘수록 성능 저하

Use Case

1. 실시간으로 빠르게 전송되어야 하는 메시지
2. 메시지 유실을 감내할 수 있는 케이스
3. 최대 1회 전송 패턴이 적합한 경우
4. Subscriber들이 다양한 채널을 유동적으로 바꾸면서 한시적으로 구독하는 경우

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
