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
        email: email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Error("ユーザーの作成に失敗しました。");
  }
}
