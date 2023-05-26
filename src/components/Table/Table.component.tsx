import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  Row,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import cx from "classnames"
import { PropsWithChildren, useMemo } from "react"

export type TableProps<DataType> = {
  data: DataType[]
  dataIsLoading?: boolean

  columns: ColumnDef<DataType>[]
  columnVisibility?: VisibilityState

  onRowClick?: (row: Row<DataType>) => unknown

  pagination?: PaginationState

  options?: {
    size?: "md" | "lg"

    hasFirstColDivider?: boolean
    hasHead?: boolean
  }

  variant?: "default" | "billing"

  onPaginationChange?: OnChangeFn<PaginationState>
}

const defaultOptions = { size: "md", hasFirstColDivider: true, hasHead: true }

// TODO: Test me
// TODO: Refactor pagination after integrating Table with API
const Table = <DataType,>({
  data,
  dataIsLoading,

  columns,
  columnVisibility,

  onRowClick,

  pagination,

  options: _options,

  variant = "default",

  onPaginationChange,
}: PropsWithChildren<TableProps<DataType>>) => {
  const tableDataWithFallback = useMemo(
    () => (dataIsLoading ? Array(pagination?.pageSize || 25).fill({}) : data),
    [data, dataIsLoading],
  )

  const table = useReactTable({
    data: tableDataWithFallback,
    columns,
    initialState: {
      columnVisibility,
    },
    state: {
      pagination,
    },
    onPaginationChange,
    manualPagination:
      typeof pagination !== "undefined" &&
      typeof onPaginationChange !== "undefined",
    getCoreRowModel: getCoreRowModel(),
  })

  const options = {
    ...defaultOptions,
    ..._options,
  }

  return (
    <table
      className={cx(
        "w-full bg-white text-blue-600 text-sm text-left",
        "rounded-lg shadow-md border-separate border-spacing-0",
        {
          "border-t border-t-blue-300/60": variant === "billing",
        },
      )}
    >
      {options.hasHead && (
        <thead className="text-xs uppercase">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-white sticky top-0 z-[2]">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cx(
                    `
                    font-normal tracking-[0.8px]
                    border-b border-blue-300
                    rounded-t-lg first:rounded-tr-none
                  `,
                    {
                      "table-cell sm:hidden sticky left-0 bg-white":
                        header.id.includes("_mobile_visible"),
                      "hidden sm:table-cell":
                        header.id.includes("_mobile_hidden"),
                      "first-of-type:border-r sm:border-r-0":
                        options.hasFirstColDivider,

                      "px-4 py-[10px]":
                        options.size === "md" && variant === "default",
                      "px-5 py-[10px]":
                        options.size === "lg" && variant === "default",
                      "pl-5 pr-3 sm:pr-5 py-3":
                        options.size === "lg" && variant === "billing",
                    },
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      )}

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={cx("group", {
              "cursor-pointer": typeof onRowClick !== "undefined",
            })}
            onClick={
              typeof onRowClick !== "undefined"
                ? () => onRowClick(row)
                : undefined
            }
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={cx(
                  `
                    relative
                    bg-white
                    border-b border-blue-300 group-last-of-type:border-b-0
                    group-last-of-type:rounded-b-lg group-last-of-type:first:rounded-br-none
                  `,
                  {
                    "table-cell sm:hidden sticky left-0 z-[1]":
                      cell.id.includes("_mobile_visible"),
                    "hidden sm:table-cell": cell.id.includes("_mobile_hidden"),

                    "first-of-type:border-r sm:border-r-0":
                      options.hasFirstColDivider,

                    "px-4 py-3": options.size === "md" && variant === "default",
                    "p-5": options.size === "lg" && variant === "default",
                    "pl-5 pr-3 py-3 sm:pr-5 sm:py-5":
                      options.size === "lg" && variant === "billing",
                  },
                )}
                style={{ width: cell.column.getSize() }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default Table
