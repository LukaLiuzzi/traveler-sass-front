import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import SearchBar from "@/components/Search/SearchBar";
import { getEmployees } from "../lib/actions";
import { Suspense } from "react";
import EmployeesTableSkeleton from "@/components/Tables/EmployeesTableSkeleton";
import EmployeesTable from "@/components/Tables/EmployeesTable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Lista de empleados | ${process.env.NEXT_PUBLIC_TENANT_NAME}`,
  description: "Lista de empleados de la empresa",
};

const allowedRoles = ["tenant", "admin"];

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const cookieStore = cookies();
  const user = cookieStore.get("user")?.value;
  const parsedUser = user ? JSON.parse(user) : null;
  if (!parsedUser || !allowedRoles.includes(parsedUser.role)) {
    // TODO ARREGLAR ERROR EN LA CONSOLA
    return redirect("/");
  }

  const currentPage = Number(searchParams?.page) || 1;
  const search = searchParams?.search || "";

  return (
    <DefaultLayout>
      <h1 className="mb-10 text-3xl font-semibold text-black dark:text-white">
        Lista de empleados
      </h1>
      <div className="mx-auto mb-10 max-w-[400px] text-black dark:text-white">
        <SearchBar placeholder="Buscar por nombre, email o rol" />
      </div>
      <Suspense
        key={search + currentPage}
        fallback={<EmployeesTableSkeleton />}
      >
        <EmployeesTable search={search} page={currentPage} />
      </Suspense>
    </DefaultLayout>
  );
}
