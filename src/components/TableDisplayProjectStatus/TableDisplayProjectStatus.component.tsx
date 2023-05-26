import cx from "classnames"

import { ProjectStatus } from "@hooks/api/useProject"

export type TableDisplayProjectStatusProps = {
  type: ProjectStatus
}

const TableDisplayProjectStatus: React.FC<TableDisplayProjectStatusProps> = ({
  type,
}) => (
  <div>
    <span
      className={cx("inline-block", "w-2 h-2 mr-[6px] mb-px", "rounded-full", {
        "bg-purple-400": ![
          ProjectStatus.Live,
          ProjectStatus.ContractPending,
        ].includes(type),
        "bg-green-600": type === ProjectStatus.Live,
        "bg-yellow-500": type === ProjectStatus.ContractPending,
      })}
    />
    {type}
  </div>
)

export default TableDisplayProjectStatus
