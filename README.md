## Description

fastcampus 대용량 데이터 & 트래픽 처리

nestjs + prisma + mysql

post pagination with cursor and offset

timeline push model vs pull model trade-off

push: 공간복잡도 (timeline table 필요) write 성능저하
pull: 시간복잡도, follow가 많을 수록 성능 저하 read 성능저하

facebook: pull / twitter: push

## Installation

```bash
$ yarn install
$ npx prisma migrate dev
$ npx prisma db seed
```

prisma seed : fake data 100만개
