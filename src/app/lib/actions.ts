"use server";

import { Employee } from "@/types/employee";
import { revalidatePath } from "next/cache";
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

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ingrese las credenciales correctamente",
      success: false,
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
      return { message: "Credenciales invalidas", success: false };
    }

    const responseCookiesString = response.headers.get("set-cookie");

    if (!responseCookiesString) {
      return { message: "Credenciales invalidas", success: false };
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

    redirect("/");
  } catch (error) {
    return { message: "Ocurrio un error inesperado", success: false };
  }
};

export const getEmployees = async ({
  search,
  page = 1,
  limit = 10,
}: {
  search: string;
  page: number;
  limit: number;
}): Promise<{
  success: boolean;
  message?: string;
  data?: {
    docs: Employee[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
}> => {
  const cookieStore = cookies();
  const cookiesList = `accessToken=${cookieStore.get("accessToken")?.value}; refreshToken=${cookieStore.get("refreshToken")?.value}`;
  try {
    const response = await fetch(
      `${process.env.API_URL}/employees?search=${search}&page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          cookie: cookiesList,
        },
        credentials: "include",
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        redirect("/auth/signin");
      }
      return { message: "Ocurrio un error inesperado", success: false };
    }

    const data = await response.json();

    return { data, success: true };
  } catch (error) {
    return { message: "Ocurrio un error inesperado", success: false };
  }
};

export const checkRole = async (roles: string[], pathToRedirect: string) => {
  const cookieStore = cookies();
  const user = cookieStore.get("user")?.value;
  const parsedUser = user ? JSON.parse(user) : null;
  if (!parsedUser || !roles.includes(parsedUser.role)) {
    console.log("redirecting");
    return redirect(pathToRedirect);
  }
};

export const updateEmployee = async (
  prevState: {
    message: string;
    success: boolean | null;
  },
  formData: FormData,
) => {
  const cookieStore = cookies();
  const cookiesList = `accessToken=${cookieStore.get("accessToken")?.value}; refreshToken=${cookieStore.get("refreshToken")?.value}`;

  const rawForm = {
    _id: formData.get("id"),
    email: formData.get("email"),
    name: formData.get("name"),
    lastName: formData.get("lastName"),
    status: formData.get("status"),
    role: formData.get("role"),
    phone: formData.get("phone"),
  };

  // Validar campos con zod
  const employeeSchema = z.object({
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    name: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    role: z.enum(["admin", "support", "sales", "finance"]).optional(),
    status: z.enum(["active", "inactive", "deleted"]).optional(),
  });

  const validatedFields = employeeSchema.safeParse(rawForm);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ingrese los campos correctamente",
      success: false,
    };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/employees/${rawForm._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          cookie: cookiesList,
        },
        credentials: "include",
        body: JSON.stringify({
          ...rawForm,
          tenantId: process.env.TENANT_ID,
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        redirect("/auth/signin");
      }
      return { message: "Ocurrio un error inesperado", success: false };
    }

    revalidatePath(`/employees`);

    return { success: true, message: "Empleado editado correctamente" };
  } catch (error) {
    console.log("ERROR", error);
    return { message: "Ocurrio un error inesperado", success: false };
  } finally {
    redirect("/employees");
  }
};

export const deleteEmployee = async (
  formData: FormData,
): Promise<{ success: boolean; message?: string }> => {
  const cookieStore = cookies();
  const cookiesList = `accessToken=${cookieStore.get("accessToken")?.value}; refreshToken=${cookieStore.get("refreshToken")?.value}`;

  const id = formData.get("id");

  if (!id) {
    return { message: "Ocurrio un error inesperado", success: false };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/employees/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        cookie: cookiesList,
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        redirect("/auth/signin");
      }
      return { message: "Ocurrio un error inesperado", success: false };
    }

    revalidatePath(`/employees`);

    return { success: true, message: "Empleado eliminado correctamente" };
  } catch (error) {
    return { message: "Ocurrio un error inesperado", success: false };
  }
};
