import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.count();
    
    if (existingAdmin > 0) {
      console.log('✅ Admin already exists!');
      return;
    }

    // Create admin
    const username = 'admin';
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    console.log('✅ Admin created successfully!');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log(`   ID: ${admin.id}`);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
