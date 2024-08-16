import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Employee } from "@/types/employee";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { checkRole, updateEmployee } from "@/app/lib/actions";
import UpdateEmployeeForm from "@/components/Forms/UpdateEmployeeForm";
import CreateEmployeeForm from "@/components/Forms/CreateEmployeeForm";

export const metadata: Metadata = {
  title: `Agregar un empleado | ${process.env.NEXT_PUBLIC_TENANT_NAME}`,
  description: "Agregar un empleado",
};

export default async function Page() {
  await checkRole(["superAdmin", "tenant"], "/");

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Agregar un empleado
                </h3>
              </div>

              <div className="p-7">
                <CreateEmployeeForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
