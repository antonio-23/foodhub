import { flexRender } from "@tanstack/react-table";
import Button from "../Button";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Input } from "../Input";
import { Select } from "../Select";
import { ButtonIcon } from "../ButtonIcon";
import { Row } from "../Row";
import Modal from "../Modal/Modal";

export default function Table({
  table,
  modal,
}: {
  table: any;
  modal: boolean;
}) {
  return (
    <>
      <div className='relative overflow-x-auto'>
        <table
          style={{
            border: "1px solid var(--color-grey-200)",
            borderRadius: "7px",
            backgroundColor: "var(--color-grey-0)",
            overflow: "hidden",
          }}
        >
          <thead
            style={{
              backgroundColor: "var(--color-grey-50)",
              borderBottom: "1px solid var(--color-grey-100)",
              color: "var(--color-grey-600)",
            }}
          >
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none m-4"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <span>↑</span>,
                          desc: <span>↓</span>,
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
                style={{
                  borderBottom: "1px solid var(--color-grey-100)",
                  color: "var(--color-grey-600)",
                }}
              >
                {row.getVisibleCells().map((cell: any) => (
                  <td key={cell.id} className='px-6 py-4'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (
          <Row type='center'>
            <ButtonIcon>
              <Modal />
            </ButtonIcon>
          </Row>
        )}
      </div>
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
        <div className='flex gap-5'>
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
    </>
  );
}
