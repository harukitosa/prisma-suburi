import { Post, PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  const userRepo: UserRepository = new UserSQLite();
  const user = await userRepo.getAll();
  console.dir(user, { depth: null })
  const u = await userRepo.getById(1);
  console.dir(u)
}

export class IUser {
  private id: number;
  private email: string;
  private name: string | null;
  
  getId(): number {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    if (this.name === null) return ""
    return this.name;
  }

  constructor(id: number, email: string, name: string | null) {
    this.id = id;
    this.email = email;
    this.name = name;
  }
}

export const NewUserRepository = (): UserRepository => {
  return new UserSQLite()
}



interface UserRepository {
  getAll(): Promise<IUser[]>
  getById(id: number): Promise<IUser>
}

class UserSQLite implements UserRepository {
  async getById(id: number): Promise<IUser> {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    });
    if (user === null) throw "UserIsNullException";
    return new IUser(user.id, user.email, user.name)
  }
  async getAll(): Promise<IUser[]> {
    return (await prisma.user.findMany()).map(item => new IUser(item.id, item.email, item.name));
  }
}


main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
