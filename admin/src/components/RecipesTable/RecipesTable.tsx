import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRecipe } from "../../hooks/useRecipe";
import Spinner from "../Spinner";
import { useState } from "react";
import Table from "../Table/Table";
import { Dropdown } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RecipeTable, items } from "../../types/types";
import { useDeleteRecipe } from "../../hooks/useDeleteRecipe";

export default function RecipesTable() {
  const { data, isLoading } = useRecipe();
  const columnHelper = createColumnHelper<RecipeTable>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const { deleteRecipe, isDeleting } = useDeleteRecipe();

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
    columnHelper.display({
      id: "actions",
      header: "Akcje",
      cell: (info) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) =>
              key === "edit"
                ? console.log(key)
                : deleteRecipe(info.row.original.id),
          }}
          placement='bottom'
          disabled={isDeleting}
        >
          <BsThreeDotsVertical />
        </Dropdown>
      ),
    }),
  ];

  const table = useReactTable<RecipeTable>({
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

  if (isLoading || isDeleting) return <Spinner />;

  return <Table table={table} />;
}