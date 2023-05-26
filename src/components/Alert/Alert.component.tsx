import cx from "classnames"

import DangerIcon from "@public/icons/danger.svg"
import InfoIcon from "@public/icons/info.svg"

type AlertProps = {
  hideIcon?: boolean

  type?: "danger" | "info"
  iconPosition?: "center" | "start" | "end"

  children: React.ReactNode

  className?: string
}

const Alert: React.FC<AlertProps> = ({
  hideIcon = false,

  type = "danger",
  iconPosition = "center",

  children,

  className,
}) => {
  const icon = {
    danger: (
      <div className="w-6 h-6 flex items-center justify-center">
        <DangerIcon className="w-5 h-5 fill-red-600" />
      </div>
    ),
    info: <InfoIcon className="w-6 h-6 fill-blue-500" />,
  }

  return (
    <div
      className={cx(
        `
        text-sm 
        rounded 
        py-3 px-4 
        w-full flex
        `,
        {
          "items-center": iconPosition === "center",
          "items-start": iconPosition === "start",
          "items-end": iconPosition === "end",
        },
        {
          "bg-red-100 text-red-800": type === "danger",
          "bg-[#F3F6F8] text-[#4E5466]": type === "info",
        },
        className,
      )}
    >
      {!hideIcon && (
        <div className="flex items-center justify-center w-6 mr-3">
          {icon[type]}
        </div>
      )}

      <div className="w-auto">{children}</div>
    </div>
  )
}

export default Alert
