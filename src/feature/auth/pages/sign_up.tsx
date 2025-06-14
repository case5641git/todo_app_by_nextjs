"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import signUp from "@/app/actions/auth/sign_up";

export const SignUp: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignUp = async (formData: FormData) => {
    startTransition(async () => {
      await signUp({
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
      })
        .then(() => {
          router.push("/todo");
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        background: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        color: "#000",
      }}
    >
      <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form action={handleSignUp}>
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            name="email"
            type="text"
            style={{ border: "1px solid #ccc", width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            type="password"
            style={{ border: "1px solid #ccc", width: "100%" }}
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
};
