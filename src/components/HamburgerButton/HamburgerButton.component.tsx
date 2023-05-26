import cx from "classnames"

type HamburgerButtonProps = {
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  className,
  onClick,
}) => {
  const commonClassNames = "absolute w-full h-[2px] bg-blue-700"

  return (
    <button
      data-testid="hamburger"
      className={cx("p-2 flex flex-col justify-between", className)}
      onClick={onClick}
    >
      <div className="relative w-6 h-4">
        <div className={cx(commonClassNames, "top-0")} />
        <div className={cx(commonClassNames, "top-1/2 -translate-y-1/2")} />
        <div className={cx(commonClassNames, "bottom-0")} />
      </div>
    </button>
  )
}

export default HamburgerButton
