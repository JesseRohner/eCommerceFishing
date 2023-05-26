import cx from "classnames"

import ArrowUpSmallIcon from "@public/icons/arrow-up-small.svg"

export type TableCompanyReputationProps = {
  index: number
  value?: number
  positionChange?: "up" | "down"
}

const TableCompanyReputation: React.FC<TableCompanyReputationProps> = ({
  index,
  value,
  positionChange,
}) => (
  <div className="flex items-center w-[80px] h-[36px] font-medium text-sm border border-blue-200 rounded">
    <div className="flex items-center justify-center w-9 h-9 bg-blue-200">
      {index}
    </div>
    <div
      className={cx("flex-1 items-center text-center", {
        "text-green-600": positionChange === "up",
        "text-red-600": positionChange === "down",
      })}
    >
      {positionChange && (
        <ArrowUpSmallIcon
          className={cx("inline-flex -mt-1 mr-1", {
            "fill-green-600": positionChange === "up",
            "fill-red-600 rotate-180": positionChange === "down",
          })}
        />
      )}
      {value || "-"}
    </div>
  </div>
)

export default TableCompanyReputation
