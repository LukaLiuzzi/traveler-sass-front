"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const logIn = async (prevState: any, formData: FormData) => {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  // TODO: Remove this timeout
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ingrese las credenciales correctamente",
    };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        tenantId: process.env.TENANT_ID,
      }),
    });

    if (!response.ok) {
      return { message: "Credenciales invalidas" };
    }

    const responseCookiesString = response.headers.get("set-cookie");

    if (!responseCookiesString) {
      return { message: "Credenciales invalidas" };
    }

    // 1h
    const accessTokenCookieTimeExpire =
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

    // 7d
    const refreshTokenCookieTimeExpire =
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

    const cookiesArray = responseCookiesString.split(",").map((cookie) => {
      const [cookieValue, ...attributes] = cookie
        .split(";")
        .map((part) => part.trim());
      const [key, value] = cookieValue.split("=");
      return { key, value, attributes };
    });

    cookiesArray.forEach((cookie) => {
      if (cookie.key === "accessToken") {
        cookies().set("accessToken", cookie.value, {
          httpOnly: true,
          expires: new Date(accessTokenCookieTimeExpire),
        });
      }
      if (cookie.key === "refreshToken") {
        cookies().set("refreshToken", cookie.value, {
          httpOnly: true,
          expires: new Date(refreshTokenCookieTimeExpire),
        });
      }
    });

    const {
      _id,
      email,
      name,
      lastName,
      deletedAt,
      status,
      role,
      tenantId,
      phone,
      createdAt,
      updatedAt,
    } = await response.json();

    cookies().set(
      "user",
      JSON.stringify({
        _id,
        email,
        name,
        lastName,
        deletedAt,
        status,
        role,
        tenantId,
        phone,
        createdAt,
        updatedAt,
      }),
      { httpOnly: true },
    );
  } catch (error) {
    return { message: "Ocurrio un error inesperado" };
  }
};
