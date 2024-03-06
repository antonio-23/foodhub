import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRecipe } from "../../hooks/useRecipe";
import Spinner from "../Spinner";
import { useState } from "react";
import Button from "../Button";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

type Recipe = {
  id: string;
  recipe_name: string;
  ingredients: string;
  content_of_recipe: string;
  preparation_time: number;
  number_of_servings: number;
  caloric_value: number;
  carbohydrates: number;
  fats: number;
  protein: number;
  photo_url: string;
};

export default function RecipesTable() {
  const { data, isLoading } = useRecipe();
  const columnHelper = createColumnHelper<Recipe>();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "ID",
    }),
    columnHelper.accessor("recipe_name", {
      cell: (info) => info.getValue(),
      header: "Nazwa przepisu",
    }),
    columnHelper.accessor("ingredients", {
      cell: (info) => info.getValue(),
      header: "Składniki",
    }),
    columnHelper.accessor("content_of_recipe", {
      cell: (info) => info.getValue(),
      header: "Treść przepisu",
    }),
    columnHelper.accessor("preparation_time", {
      cell: (info) => info.getValue(),
      header: "Czas przygotowania",
      size: 10,
    }),
    columnHelper.accessor("number_of_servings", {
      cell: (info) => info.getValue(),
      header: "Liczba porcji",
    }),
    columnHelper.accessor("caloric_value", {
      cell: (info) => info.getValue(),
      header: "Wartość kaloryczna",
    }),
    columnHelper.accessor("carbohydrates", {
      cell: (info) => info.getValue(),
      header: "Węglowodany",
    }),
    columnHelper.accessor("fats", {
      cell: (info) => info.getValue(),
      header: "Tłuszcze",
      size: 10,
    }),
    columnHelper.accessor("protein", {
      cell: (info) => info.getValue(),
      header: "Białko",
    }),
  ];

  const table = useReactTable<Recipe>({
    data: data || [],
    columns,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 2,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className='flex flex-col h-screen mx-auto'>
      <table className='border'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='border-b uppercase'>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='px-4 pr-2 py-4 font-medium text-left bg-gray-100'
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='border-b'>
              {row.getVisibleCells().map((cell) => (
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
          <select
            className='border p-1 rounded w-16 border-gray-200'
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
          </select>
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
            <input
              min={1}
              max={table.getPageCount()}
              type='number'
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className='border p-1 rounded w-18'
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
