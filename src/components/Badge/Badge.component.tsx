import cx from "classnames"

type BadgeProps = {
  shape?: "squircle" | "circle" // how is 'squircle' a real word?
  size?: "sm" | "md" | "lg"

  value: string

  className?: string
}

const Badge: React.FC<BadgeProps> = ({
  shape = "squircle",
  size = "sm",

  value,

  className,
}) => {
  return (
    <span
      data-testid="badge"
      className={cx(
        `
        inline-block
        bg-green-500 whitespace-nowrap align-baseline
        font-normal text-blue-900 text-center tracking-[0.4px] leading-none
        `,
        {
          "rounded-sm": shape === "squircle" && size !== "lg",
          "rounded-[4px]": shape === "squircle" && size === "lg",
          "rounded-full": shape === "circle",

          "text-[10px] px-1 py-0.5": size === "sm",
          "text-xs px-1 py-[2px]": size === "md",
          "text-xs px-[7px] py-1": size === "lg",
        },
        className,
      )}
    >
      {value}
    </span>
  )
}

export default Badge
