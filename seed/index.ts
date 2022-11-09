import { main as ColaboratorsMain } from './colaborators';
import { main as UserMain } from './users';

async function seed(): Promise<void> {
  await UserMain();
  await ColaboratorsMain();
}

seed();
