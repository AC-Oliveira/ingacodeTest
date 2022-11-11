import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const passwordGenerator = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export async function main(): Promise<void> {
  const prisma = new PrismaClient();
  prisma.$connect();

  await prisma.users.createMany({
    data: [
      {
        Username: 'DarthVader',
        Password: await passwordGenerator('vader1234'),
      },
      {
        Username: 'HanSolo',
        Password: await passwordGenerator('Solo1234'),
      },
      {
        Username: 'C3P0',
        Password: await passwordGenerator('C3P01234'),
      },
      {
        Username: 'LEIA',
        Password: await passwordGenerator('LEIA1234'),
      },
    ],
  });

  const users = await prisma.users.findMany();

  users.forEach(async (user) => {
    const colaborators = await prisma.collaborators.create({
      data: {
        Id: user.Id,
        Name: user.Username,
      },
    });
  });

  await prisma.projects.createMany({
    data: [
      {
        Name: 'Java',
        CreatedAt: new Date('2022-01-01'),
      },
      {
        Name: 'C#',
        CreatedAt: new Date('2022-06-08'),
      },
      {
        Name: 'Python',
        CreatedAt: new Date('2022-07-01'),
      },
    ],
  });

  const projects = await prisma.projects.findMany({
    orderBy: {
      CreatedAt: 'asc',
    },
  });

  projects.forEach(async (project) => {
    await prisma.tasks.createMany({
      data: [
        {
          Name: `Padawan ${project.Name}`,
          Description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis neque quis fermentum gravida. Nullam imperdiet felis turpis, ut maximus eros euismod ac. Nullam a mauris dignissim, ornare tortor at, aliquam erat. Phasellus et accumsan libero. Proin at orci eros. Etiam lobortis at ipsum et semper. Nulla pellentesque felis eu est sodales auctor. Nunc et lorem interdum, scelerisque nulla in, venenatis felis. Nam non molestie diam, eu posuere magna. Proin sem dolor, mattis ac interdum sed, consequat vitae eros. Sed ut enim quis libero euismod tincidunt. Etiam imperdiet libero nec diam tempus laoreet. Mauris ultrices erat leo, in aliquam leo congue vitae. Integer in lacinia ipsum.',
          ProjectId: project.Id,
        },
        {
          Name: `Cavaleiro Jedi ${project.Name}`,
          Description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis neque quis fermentum gravida. Nullam imperdiet felis turpis, ut maximus eros euismod ac. Nullam a mauris dignissim, ornare tortor at, aliquam erat. Phasellus et accumsan libero. Proin at orci eros. Etiam lobortis at ipsum et semper. Nulla pellentesque felis eu est sodales auctor. Nunc et lorem interdum, scelerisque nulla in, venen',
          ProjectId: project.Id,
        },
        {
          Name: `Mestre Jedi ${project.Name}`,
          Description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis neque quis fermentum gravida. Nullam imperdiet felis turpis, ut maximus eros euismod ac. Nullam a mauris dignissim, ornare tortor at, aliquam erat. Phasellus et accumsan libero. Proin at orci eros. Etiam lobortis at ipsum et semper. Nulla pellentesque felis eu est sodales auctor. Nunc et lorem interdum, scelerisque nulla in, venen',
          ProjectId: project.Id,
        },
      ],
    });
  });

  prisma.$disconnect();
}

main();
