import { flexRender } from "@tanstack/react-table";
import Button from "../Button";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDarkMode } from "../../context/DarkModeContext";
import { Input } from "../Input";
import { Select } from "../Select";

export default function Table({ table }: { table: any }) {
  const { isDarkMode } = useDarkMode();
  return (
    <div className='flex flex-col h-screen mx-auto'>
      <table
        className={`${isDarkMode ? "border border-gray-700" : "border border-gray-200"}`}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <tr
              key={headerGroup.id}
              className={`${isDarkMode ? "border-b border-gray-700 uppercase" : "border-b border-gray-200 uppercase"}`}
            >
              {headerGroup.headers.map((header: any) => (
                <th
                  key={header.id}
                  className={`px-4 pr-2 py-4 font-medium text-left bg-gray-100 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex min-w-[36px]"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <span className='pl-2'>↑</span>,
                        desc: <span className='pl-2'>↓</span>,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: any) => (
            <tr
              key={row.id}
              className={`${isDarkMode ? "border-b border-gray-700" : "border-b border-gray-200"}`}
            >
              {row.getVisibleCells().map((cell: any) => (
                <td key={cell.id} className='px-4 pt-[14px] pb-[18px]'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-md'>
        <div className='sm:mr-auto sm:mb-0 mb-2'>
          <span className='mr-2'>Ilość na stronie</span>
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[2, 4, 6, 8].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
        </div>
        <div className='flex gap-4'>
          <Button
            size='small'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <LeftOutlined />
          </Button>
          <span className='flex items-center gap-1'>
            <Input
              min={1}
              max={table.getPageCount()}
              type='number'
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
            z {table.getPageCount()}
          </span>
          <Button
            size='small'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <RightOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
}
