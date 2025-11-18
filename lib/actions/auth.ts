"use server";

import { prisma } from "@/lib/prisma";
import { RegisterSchema, RegisterSchemaType } from "@/lib/schemas";
import bcrypt from "bcryptjs";

export async function registerUser(data: RegisterSchemaType) {
  const validationResult = RegisterSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: "Invalid data provided.",
      issues: validationResult.error.format(),
    };
  }

  const { name, email, password } = validationResult.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser)
      return {
        success: false,
        error: "An account with this email already exists.",
      };

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name: name || null,
        email,
        password: hashedPassword,
        role: "user",
      },
    });

    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Could not create account. Please try again later.",
    };
  }
}

export async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(password, hashedPassword);
}
