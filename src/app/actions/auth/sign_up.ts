"use server";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) {
    throw new Error("メールアドレスとパスワードは必須です。");
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("有効なメールアドレスを入力してください。");
  }

  // Validate password strength (minimum 8 characters)
  if (password.length < 8) {
    throw new Error("パスワードは8文字以上である必要があります。");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    throw new Error("このメールアドレスはすでに使用されています。");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Error("ユーザーの作成に失敗しました。");
  }
}
