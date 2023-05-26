import cx from "classnames"
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react"

import CloseIcon from "@public/icons/close.svg"
import TickSmallIcon from "@public/icons/tick-small.svg"

type CheckboxProps = {
  id: string

  shape?: "squircle" | "circle"
  size?: "md" | "md-2"
  checkboxAlign?: "top" | "center"

  isInvalid?: boolean
  isDisabled?: boolean
  isReadonly?: boolean
  isThreeState?: boolean

  checked?: boolean | null
  hasNonCheckedIcon?: boolean
  hasNoDisabledHoverStyles?: boolean

  label?: string
  helperText?: string
  errorText?: string

  labelAppend?: React.ReactElement

  displayTimelineConnector?: boolean
  timelineConnectorClassName?: string

  onChange?: (
    e: ChangeEvent<HTMLInputElement>,
    prevState?: boolean | null,
    nextState?: boolean | null,
  ) => void

  className?: string

  children?: React.ReactNode
}

const updateInput = (
  ref: RefObject<HTMLInputElement>,
  checked: boolean | null,
) => {
  const input = ref.current

  if (input) {
    // @ts-ignore
    input.checked = checked
    input.indeterminate = checked === null
  }
}

const Checkbox: React.FC<CheckboxProps> = ({
  shape = "squircle",
  size = "md",
  checkboxAlign = "center",

  id,

  isInvalid,
  isDisabled,
  isReadonly,
  isThreeState = false,

  checked = false,
  hasNonCheckedIcon = false,
  hasNoDisabledHoverStyles = false,

  label,
  helperText,
  errorText,

  labelAppend,

  displayTimelineConnector,
  timelineConnectorClassName,

  onChange,

  className,

  children,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [checkboxState, setCheckboxState] = useState<boolean | null>(checked)

  useEffect(() => {
    setCheckboxState(checked)

    updateInput(inputRef, checked)
  }, [checked])

  const handleClick = (e: any) => {
    let nextState

    switch (checkboxState) {
      case true:
        nextState = false
        break

      case false:
        nextState = isThreeState ? null : true
        break

      default: // null
        nextState = true
    }

    setCheckboxState(nextState)

    updateInput(inputRef, nextState)

    if (onChange) {
      onChange(e, checkboxState, nextState)
    }
  }

  return (
    <div
      data-testid="checkbox-wrapper"
      className={cx(
        "relative flex font-normal text-sm tracking-[0.17px] group",
        {
          "text-blue-700": shape === "squircle",
          "text-blue-600": shape === "circle",

          "items-center": shape === "squircle" && checkboxAlign === "center",
        },
        className,
      )}
    >
      {displayTimelineConnector && (
        <div
          className={cx(
            "absolute w-[2px] h-full bg-green-500 top-3",
            {
              "ml-[9px]": size === "md",
              "ml-[10px]": size === "md-2",
            },
            timelineConnectorClassName,
          )}
        />
      )}

      <input
        data-testid="checkbox-input"
        ref={inputRef}
        id={id}
        type="checkbox"
        className="hidden"
        onChange={isDisabled || isReadonly ? undefined : handleClick}
        disabled={isDisabled}
        readOnly={isReadonly}
      />

      <div
        data-testid="checkbox-styled-element"
        className={cx(
          "flex flex-shrink-0 items-center justify-center overflow-hidden z-10",
          "border-2",
          "fill-blue-900",
          {
            rounded: shape === "squircle",
            "rounded-full": shape === "circle",

            "mt-1": shape === "circle" && helperText,

            "w-5 h-5": size === "md",
            "w-[23.3px] h-[23.3px]": size === "md-2",

            "bg-green-500 !border-green-500": checkboxState !== false,
            "bg-white": !checkboxState,
            "bg-[#EBF1F5] !border-[#EBF1F5] fill-blue-500": isDisabled,

            "border-blue-400": !hasNonCheckedIcon,
            "border-transparent": hasNonCheckedIcon,
            "border-red-800": isInvalid,

            "cursor-pointer": !isDisabled && !isReadonly,
            "cursor-default": isDisabled || isReadonly,

            "group-hover:border-green-500":
              !hasNoDisabledHoverStyles && !isInvalid,
            "group-hover:border-red-800":
              !hasNoDisabledHoverStyles && isInvalid,
          },
        )}
        onClick={isDisabled || isReadonly ? undefined : handleClick}
      >
        {checkboxState ? (
          <TickSmallIcon
            data-testid="checkbox-tick-icon"
            fill="inherit"
            className={cx("-mx-1", {
              "-mx-px stroke-blue-900 stroke-[0.7px]":
                size === "md" && shape === "circle",
            })}
          />
        ) : checkboxState === null ? (
          <div
            data-testid="checkbox-indeterminate-icon"
            className={cx("w-[10px] h-[2px] rounded-sm", {
              "bg-blue-900": !isDisabled,
              "bg-blue-500": isDisabled,
            })}
          />
        ) : (
          hasNonCheckedIcon && <CloseIcon className="fill-blue-400 -mx-[4px]" />
        )}
      </div>

      {(label || children || helperText) && (
        <div
          className={cx({
            "ml-[10px]": !helperText,
            "ml-[14px]": helperText,
            "-mt-0.5": checkboxAlign === "top",
          })}
        >
          {(label || children) && (
            <label
              data-testid="checkbox-label"
              htmlFor={id}
              className={cx({
                "text-blue-900":
                  helperText || (shape === "circle" && size === "md-2"),

                "text-base": size === "md-2",

                "cursor-pointer": !isDisabled && !isReadonly,
                "cursor-default": isDisabled || isReadonly,
              })}
            >
              {label ? (
                <>
                  {label}

                  {labelAppend && (
                    <span
                      data-testid="checkbox-label-append"
                      className="ml-[6px]"
                    >
                      {labelAppend}
                    </span>
                  )}
                </>
              ) : (
                children
              )}
            </label>
          )}
          {(helperText || errorText) && (
            <div className="text-xs tracking-[0.17px] mt-1">
              {isInvalid && errorText && (
                <p data-testid="checkbox-error-text" className="text-red-800">
                  {errorText}
                </p>
              )}
              {helperText && (
                <p
                  data-testid="checkbox-helper-text"
                  className={cx({ "mt-[2px]": shape === "circle" })}
                >
                  {helperText}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Checkbox
