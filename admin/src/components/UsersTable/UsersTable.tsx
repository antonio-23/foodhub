import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useState } from "react";
import Spinner from "../Spinner";
import Table from "../Table/Table";
import { UserTable } from "../../types/types";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { ButtonIcon } from "../ButtonIcon";
import { DeleteOutlined } from "@ant-design/icons";

export default function UsersTable() {
  const { data, isLoading } = useAllUsers();
  const columnHelper = createColumnHelper<UserTable>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const { deleteUser, isDeleting: isDeletingUser } = useDeleteUser();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "ID",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Nazwa użytkownika",
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: "Email",
    }),
    columnHelper.accessor("gender", {
      cell: (info) => info.getValue(),
      header: "Płeć",
    }),
    columnHelper.accessor("height", {
      cell: (info) => info.getValue(),
      header: "Wzrost",
    }),
    columnHelper.accessor("actual_weight", {
      cell: (info) => info.getValue(),
      header: "Aktualna waga",
    }),
    columnHelper.accessor("weight_management_goal", {
      cell: (info) => info.getValue(),
      header: "Cel zarządzania wagą",
    }),
    columnHelper.accessor("physical_activity", {
      cell: (info) => info.getValue(),
      header: "Aktywność fizyczna",
    }),
    columnHelper.accessor("weight_goal", {
      cell: (info) => info.getValue(),
      header: "Cel wagi",
    }),
    columnHelper.accessor("birth_date", {
      cell: (info) => info.getValue(),
      header: "Data urodzenia",
    }),
    columnHelper.display({
      id: "actions",
      header: "Akcje",
      cell: (info) => (
        <ButtonIcon
          color='var(--color-red-700)'
          onClick={() => deleteUser(info.row.original.id)}
        >
          <DeleteOutlined />
        </ButtonIcon>
      ),
    }),
  ];

  const table = useReactTable<UserTable>({
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

  if (isLoading || isDeletingUser) return <Spinner />;

  return <Table table={table} />;
}
