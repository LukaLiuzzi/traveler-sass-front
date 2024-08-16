"use client";

import { useActionState } from "react";
import { updateEmployee } from "@/app/lib/actions";
import { Employee } from "@/types/employee";
import SelectGroupTwo from "../SelectGroup/SelectGroupTwo";

type UpdateEmployeeFormProps = {
  employee: Employee;
};

const initialState = {
  message: "",
  success: null,
};

const employeeRoles = [
  { value: "admin", label: "Admin" },
  { value: "sales", label: "Ventas" },
  { value: "support", label: "Soporte" },
  { value: "finance", label: "Finanzas" },
];

const userStatus = [
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Inactivo" },
  { value: "deleted", label: "Eliminado" },
];

const UpdateEmployeeForm = ({ employee }: UpdateEmployeeFormProps) => {
  const [state, formAction, pending] = useActionState(
    updateEmployee,
    initialState,
  );

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="id" value={employee?._id} />
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="name"
            >
              Nombre:
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                      fill=""
                    />
                  </g>
                </svg>
              </span>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="name"
                id="name"
                defaultValue={employee?.name}
              />
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="lastName"
            >
              Apellido:
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                      fill=""
                    />
                  </g>
                </svg>
              </span>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="lastName"
                id="lastName"
                defaultValue={employee?.lastName}
              />
            </div>
          </div>
        </div>

        <div className="mb-5.5 flex w-full flex-wrap">
          <div className="w-full pr-2.5 sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                      fill=""
                    />
                  </g>
                </svg>
              </span>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="email"
                name="email"
                id="email"
                defaultValue={employee?.email}
              />
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="phone"
            >
              Telefono
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="phone"
              id="phone"
              defaultValue={employee?.phone}
            />
          </div>
        </div>

        <div className="mb-5.5 flex w-full flex-wrap">
          <div className="w-full pr-2.5 sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Rol
            </label>
            <SelectGroupTwo
              title=""
              options={employeeRoles}
              defaultValue={employee?.role}
              name="role"
            />
          </div>

          <div className="w-full pl-2.5 sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Estado
            </label>
            <SelectGroupTwo
              title=""
              options={userStatus}
              defaultValue={employee?.status}
              name="status"
            />
          </div>
        </div>

        <div className="mb-5.5 flex w-full flex-wrap">
          <div className="w-full pr-2.5 sm:w-1/3">
            <p className="mb-3 block text-sm font-medium text-black dark:text-white">
              Fecha de registro
            </p>
            {employee?.createdAt ? (
              <p className="text-black dark:text-white">
                {new Date(employee.createdAt).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-black dark:text-white">-</p>
            )}
          </div>

          <div className="w-full px-2.5 sm:w-1/3">
            <p className="mb-3 block text-sm font-medium text-black dark:text-white">
              Última actualización
            </p>
            {employee?.updatedAt ? (
              <p className="text-black dark:text-white">
                {new Date(employee.updatedAt).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-black dark:text-white">-</p>
            )}
          </div>

          <div className="w-full pl-2.5 sm:w-1/3">
            <p className="mb-3 block text-sm font-medium text-black dark:text-white">
              Fecha de eliminación
            </p>
            {employee?.deletedAt ? (
              <p className="text-black dark:text-white">
                {new Date(employee.deletedAt).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-black dark:text-white">-</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4.5">
          {/* <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancelar
                    </button> */}
          <button
            className="flex justify-center rounded bg-strokedark px-6 py-2 font-medium text-white hover:bg-opacity-90 dark:bg-primary dark:text-white"
            type="submit"
            disabled={pending}
          >
            {pending ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
      {state?.success === false && (
        <div className="mt-5.5 border border-danger bg-danger bg-opacity-10 p-3 text-danger text-opacity-100">
          {state?.message}
        </div>
      )}
    </>
  );
};

export default UpdateEmployeeForm;
