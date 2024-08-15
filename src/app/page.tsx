import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { checkRole } from "./lib/actions";

export const metadata: Metadata = {
  title: `Inicio | ${process.env.NEXT_PUBLIC_TENANT_NAME}`,
  description: "Informacion general de la empresa",
};

const allowedRoles = ["tenant", "admin", "sales", "support", "finance"];

export default async function Home() {
  await checkRole(allowedRoles, "/auth/signin");

  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
