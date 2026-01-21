import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const seedUsers = async () => {
  try {
    const users = [
      {
        email: 'karamjeet75@gmail.com',
        password: 'midaslogistics@123'
      },
      {
        email: 'jasdeepsingh8077@gmail.com',
        password: 'midaslogistics@123'
      }
    ];

    for (const userData of users) {
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await prisma.user.create({
          data: {
            email: userData.email,
            password: hashedPassword
          }
        });
        console.log(`User ${userData.email} created successfully`);
      } else {
        console.log(`User ${userData.email} already exists`);
      }
    }

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedUsers();
