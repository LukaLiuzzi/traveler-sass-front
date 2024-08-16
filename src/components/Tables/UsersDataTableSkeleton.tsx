const EmployeesTableSkeleton = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Informacion
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Rol
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Estado
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <div className="bg-gray-300 mb-2.5 h-4 rounded dark:bg-meta-4"></div>
                  <div className="bg-gray-300 h-3 w-1/2 rounded dark:bg-meta-4"></div>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="bg-gray-300 h-4 w-3/4 rounded dark:bg-meta-4"></div>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="bg-gray-300 h-4 w-1/4 rounded dark:bg-meta-4"></div>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {[...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className="bg-gray-300 h-4 w-4 rounded-full dark:bg-meta-4"
                      ></div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesTableSkeleton;
