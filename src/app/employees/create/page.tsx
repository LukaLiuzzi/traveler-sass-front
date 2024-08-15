import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Employee } from "@/types/employee";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { updateEmployee } from "@/app/lib/actions";
import UpdateEmployeeForm from "@/components/Forms/UpdateEmployeeForm";

export const metadata: Metadata = {
  title: `Agregar un empleado | ${process.env.NEXT_PUBLIC_TENANT_NAME}`,
  description: "Agregar un empleado",
};

export default async function Page() {
  return (
    <DefaultLayout>
      <h1>CREAR EMPLEADO</h1>
    </DefaultLayout>
  );
}
