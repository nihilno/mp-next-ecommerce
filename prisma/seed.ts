import { hashPassword } from "@/lib/actions/auth";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  // await prisma.orderItem.deleteMany();
  // await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
    },
  });

  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      slug: "clothing",
    },
  });

  const home = await prisma.category.create({
    data: {
      name: "Home",
      slug: "home",
    },
  });

  const products = [
    {
      id: "1",
      name: "Wireless Headphones",
      description:
        "Premium noise-cancelling wireless headphones with long battery life.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      slug: "wireless-headphones",
      categoryId: electronics.id,
      inventory: 25,
    },
    {
      id: "2",
      name: "Smart Watch",
      description:
        "Fitness tracker with heart rate monitoring and sleep analysis.",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      slug: "smart-watch",
      categoryId: electronics.id,
      inventory: 25,
    },
    {
      id: "3",
      name: "Running Shoes",
      description: "Lightweight running shoes with responsive cushioning.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      slug: "running-shoes",
      categoryId: clothing.id,
      inventory: 35,
    },
    {
      id: "4",
      name: "Ceramic Mug",
      description: "Handcrafted ceramic mug with minimalist design.",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
      slug: "ceramic-mug",
      categoryId: home.id,
      inventory: 0,
    },
    {
      id: "5",
      name: "Leather Backpack",
      description: "Durable leather backpack with multiple compartments.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
      slug: "leather-backpack",
      categoryId: clothing.id,
      inventory: 15,
    },
    {
      id: "6",
      name: "Bluetooth Speaker",
      description:
        "Portable Bluetooth speaker with deep bass and waterproof design.",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1588131153911-a4ea5189fe19",
      slug: "bluetooth-speaker",
      categoryId: electronics.id,
      inventory: 40,
    },
    {
      id: "7",
      name: "Wireless Mouse",
      description:
        "Ergonomic wireless mouse with adjustable DPI and silent clicks.",
      price: 29.99,
      image: "http://images.unsplash.com/photo-1527814050087-3793815479db",
      slug: "wireless-mouse",
      categoryId: electronics.id,
      inventory: 60,
    },
    {
      id: "8",
      name: "Denim Pants",
      description:
        "Stretchable and breathable denim pants for maximum comfort.",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
      slug: "denim-pants",
      categoryId: clothing.id,
      inventory: 45,
    },
    {
      id: "9",
      name: "Denim Jacket",
      description: "Classic denim jacket with a modern slim fit design.",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
      slug: "denim-jacket",
      categoryId: clothing.id,
      inventory: 25,
    },
    {
      id: "10",
      name: "Table Lamp",
      description: "Modern LED table lamp with adjustable brightness levels.",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1618008658949-dfd52f2caa75",
      slug: "table-lamp",
      categoryId: home.id,
      inventory: 50,
    },
    {
      id: "11",
      name: "Cotton Throw Blanket",
      description: "Soft cotton throw blanket perfect for cozy evenings.",
      price: 44.99,
      image: "http://images.unsplash.com/photo-1598622444660-9d76ceeb7daf",
      slug: "cotton-throw-blanket",
      categoryId: home.id,
      inventory: 60,
    },
    {
      id: "12",
      name: "Wireless Keyboard",
      description:
        "Slim wireless keyboard with quiet keys and long battery life.",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1694405145070-e58cc29771fa",
      slug: "wireless-keyboard",
      categoryId: electronics.id,
      inventory: 55,
    },
    {
      id: "13",
      name: "Sports Hoodie",
      description: "Lightweight hoodie ideal for workouts and casual wear.",
      price: 54.99,
      image:
        "https://plus.unsplash.com/premium_photo-1673125510222-1a51e3a8ccb0",
      slug: "sports-hoodie",
      categoryId: clothing.id,
      inventory: 35,
    },
    {
      id: "14",
      name: "Aroma Diffuser",
      description:
        "Ultrasonic aroma diffuser with LED light and timer settings.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1660853041560-69efa3512a05",
      slug: "aroma-diffuser",
      categoryId: home.id,
      inventory: 0,
    },
    {
      id: "15",
      name: "Wireless Earbuds",
      description: "Compact true wireless earbuds with touch controls and mic.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f",
      slug: "wireless-earbuds",
      categoryId: electronics.id,
      inventory: 30,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  const users = [
    {
      id: "1",
      name: "Maciej",
      email: "maciej.polowy1@gmail.com",
      password: "qwerty123",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const user of users) {
    const hashedPassword = await hashPassword(user.password);

    await prisma.user.create({
      data: { ...user, password: hashedPassword },
    });
  }
}

main()
  .then(async () => {
    console.log("Seeding complete!");
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
