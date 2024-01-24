import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteUser as deleteUserAPI,
  fetchAllUsers,
} from "../../services/usersAPI";
import {
  ColumnSort,
  OnChangeFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSearch } from "react-icons/fa";
import {
  Action,
  Cell,
  HeaderTitle,
  Pagination,
  PaginationButton,
  PaginationCurrentPage,
  SearchBox,
  SpinnerBox,
  TableHeader,
  TableRow,
  TableWrapper,
} from "./styles";
import { convertTimestampToDate } from "../../utils/utils";
import React, { useEffect, useState } from "react";
import { Dropdown, Input, MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import "./styles.css";
import Spinner from "../Spinner";
import { deleteUserFromAuth } from "../../services/authAPI";
function UsersTable() {
  const queryClient = useQueryClient();
  const { isLoading, data: users } = useQuery({
    queryFn: fetchAllUsers,
    queryKey: ["allUsers"],
  });

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [page, setPage] = useState(0);

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: "Usuń",
    },
    {
      key: 2,
      label: "Zablokuj",
    },
  ];

  const { mutate: deleteUser } = useMutation({
    mutationFn: deleteUserAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      setPage(0);
      toast.success("Użytkownik został usunięty");
    },
  });

  const { mutate: deleteAuth } = useMutation({
    mutationFn: deleteUserFromAuth,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const columns = [
    {
      header: "id",
      accessorKey: "id",
      size: 30,
      cell: (props: { getValue: () => string | number }) => (
        <p>{props.getValue()}</p>
      ),
    },
    {
      header: "Imie i nazwisko",
      accessorKey: "name",
      size: 200,
      cell: (props: { getValue: () => string }) => <p>{props.getValue()}</p>,
    },
    {
      header: "Adres email",
      accessorKey: "email",
      size: 200,
      cell: (props: { getValue: () => string }) => <p>{props.getValue()}</p>,
    },
    {
      header: "Płeć",
      accessorKey: "gender",
      size: 100,
      cell: (props: { getValue: () => string }) => <p>{props.getValue()}</p>,
    },
    {
      header: "Dołączył",
      accessorKey: "created_at",
      size: 120,
      cell: (props: { getValue: () => string }) => (
        <p>{convertTimestampToDate(Date.parse(props.getValue()))}</p>
      ),
    },
    {
      header: "Akcje",
      size: 30,
      cell: (row: { row: { original: { id: string; user_id: string } } }) => {
        return (
          <Dropdown
            trigger={["click"]}
            menu={{
              items,
              onClick: ({ key }) => {
                if (Number(key) === 1) {
                  deleteAuth(row.row.original.user_id);
                  deleteUser(row.row.original.id);
                } else {
                  toast.error("Nie można zablokować użytkownika");
                }
              },
            }}
            placement="bottomRight"
            arrow
          >
            <Action>
              <MoreOutlined />
            </Action>
          </Dropdown>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users ? users : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting as OnChangeFn<ColumnSort[]>,
  });

  useEffect(() => {
    table.setPageIndex(page);
  }, [table, page]);

  useEffect(() => {
    setPage(0);
  }, [filtering]);

  if (isLoading)
    return (
      <SpinnerBox>
        <Spinner />
      </SpinnerBox>
    );
  return (
    <React.Fragment>
      <SearchBox>
        <Input
          onChange={(e) => setFiltering(e.target.value)}
          value={filtering}
          placeholder="Szukaj..."
          className="searchInput"
          allowClear={true}
          prefix={<FaSearch />}
        />
      </SearchBox>
      <TableWrapper>
        <div>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeader key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <HeaderTitle
                  width={`${header.getSize()}px`}
                  onClick={() => header.column.toggleSorting()}
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc"
                    ? "⬆️"
                    : header.column.getIsSorted() === "desc"
                    ? "⬇️"
                    : null}
                </HeaderTitle>
              ))}
            </TableHeader>
          ))}
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Cell width={`${cell.column.getSize()}px`} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Cell>
              ))}
            </TableRow>
          ))}
        </div>
      </TableWrapper>
      {filtering ? (
        " "
      ) : (
        <Pagination>
          Strona:
          <PaginationButton
            disabled={!table.getCanPreviousPage()}
            onClick={() => setPage((page) => page - 1)}
          >
            {"⬅️"}
          </PaginationButton>
          <PaginationCurrentPage>
            {page + 1}/{Math.ceil(users?.length ? users?.length / 10 : 0)}
          </PaginationCurrentPage>
          <PaginationButton
            disabled={!table.getCanNextPage()}
            onClick={() => setPage((page) => page + 1)}
          >
            {"➡️"}
          </PaginationButton>
        </Pagination>
      )}
    </React.Fragment>
  );
}

export default UsersTable;
