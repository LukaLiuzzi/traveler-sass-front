import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import SearchBar from "@/components/Search/SearchBar";
import { checkRole, getEmployees, deleteEmployee } from "../lib/actions";
import { Suspense } from "react";
import UsersDataTableSkeleton from "@/components/Tables/UsersDataTableSkeleton";
import UsersDataTable from "@/components/Tables/UsersDataTable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Lista de empleados | ${process.env.NEXT_PUBLIC_TENANT_NAME}`,
  description: "Lista de empleados de la empresa",
};

const allowedRoles = ["superAdmin", "tenant", "admin"];

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  await checkRole(allowedRoles, "/auth/signin");

  const currentPage = Number(searchParams?.page) || 1;
  const search = searchParams?.search || "";

  return (
    <DefaultLayout>
      <h1 className="mb-10 text-3xl font-semibold text-black dark:text-white">
        Lista de empleados
      </h1>
      <div className="mx-auto mb-10 max-w-[400px] text-black dark:text-white">
        <SearchBar placeholder="Buscar por nombre o email" />
      </div>
      <Suspense
        key={search + currentPage}
        fallback={<UsersDataTableSkeleton />}
      >
        <UsersDataTable
          search={search}
          page={currentPage}
          getData={() =>
            getEmployees({
              search,
              page: currentPage,
              limit: 10,
            })
          }
          deleteData={deleteEmployee}
        />
      </Suspense>
    </DefaultLayout>
  );
}
