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

  return <Table table={table} />;
}
