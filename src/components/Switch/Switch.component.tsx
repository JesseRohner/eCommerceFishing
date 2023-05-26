import cx from "classnames"

type SwitchProps = {
  checked: boolean
  onClick: () => void
  label?: string
  description?: string
  isDisabled?: boolean
  className?: string
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onClick,
  label,
  description,
  isDisabled = false,
  className,
}) => {
  return (
    <div
      data-testid="switch-wrapper"
      className={cx("flex items-center", className)}
    >
      <label
        data-testid="switch-input"
        className="relative flex items-center w-full cursor-pointer"
      >
        <div>
          <input
            data-testid="switch-hidden-input"
            type="checkbox"
            disabled={isDisabled}
            className="sr-only peer"
            checked={checked}
            onChange={
              isDisabled || typeof onClick === "undefined" ? undefined : onClick
            }
          />

          <div className="w-[34px] h-[14px] bg-blue-900 border-[#FAFAFA] opacity-25 rounded-[10px] peer peer-focus:ring-green-300 peer-checked:opacity-100 peer-checked:bg-[#17C2B5]" />
          {/* #FAFAFA, #F3F6F8, #17C2B5, #088f84 Not Existed in tailwind.config*/}
          <div className="absolute top-1/2 left-[-3px] peer-checked:after:translate-x-full after:absolute after:bg-white peer-checked:after:opacity-100 after:rounded-full after:border after:border-[#F3F6F8] after:shadow-[0_2px_4px_rgba(0,0,0,0.4)] after:h-5 after:w-5 after:top-[-10px] after:transition-all hover:before:w-9 hover:before:h-9 peer-checked:hover:before:bg-[#088f84] hover:before:bg-blue-900 before:opacity-[0.08] hover:before:rounded-full hover:before:absolute before:top-[-18px] before:left-[-8px] before:scale-75 hover:before:scale-100 peer-checked:before:translate-x-[20px] before:transition-all" />
        </div>
        {(label || description) && (
          <div data-testid="switch-label-wrapper" className="pl-4">
            {label && (
              <p
                data-testid="switch-label_title"
                className={cx("text-base font-normal leading-5 text-blue-900", {
                  "mb-1": description,
                })}
              >
                {label}
              </p>
            )}
            {description && (
              <p
                data-testid="switch-label_description"
                className="text-xs font-normal leading-[18px] text-[#4E5466]"
              >
                {/* #4E5466 Not Existed in tailwind.config */}
                {description}
              </p>
            )}
          </div>
        )}
      </label>
    </div>
  )
}

export default Switch
