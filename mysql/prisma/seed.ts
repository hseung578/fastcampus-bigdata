import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const datas = Array.from({ length: 1000 }, () =>
  Array.from({ length: 1000 }).map(() => {
    const date = faker.date.recent(365);
    return {
      memberId: 1,
      contents: faker.lorem.words(),
      createDate: date,
      createdAt: date,
    };
  }),
);

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    datas.map((data) => {
      return prisma.post.createMany({ data });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
