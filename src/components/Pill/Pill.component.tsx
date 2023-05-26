import cx from "classnames"

type PillProps = {
  size?: "sm" | "md"

  children: React.ReactNode

  className?: string
}

const Pill: React.FC<PillProps> = ({ size = "sm", children, className }) => (
  <span
    className={cx(
      "font-medium leading-4 tracking-[0.17px] text-purple-600 bg-purple-100 px-2 py-1 rounded-xl",
      {
        "text-sm": size === "sm",
        "text-base": size === "md",
      },
      className,
    )}
  >
    {children}
  </span>
)

export default Pill
