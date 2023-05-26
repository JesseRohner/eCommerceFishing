import cx from "classnames"
import { forwardRef, useRef, useState } from "react"

import { InputProps } from "./Input.types"

import CloseIcon from "@public/icons/close.svg"
import { __DEV__ } from "@utils/env"

import EyeIcon from "@public/icons/eye.svg"

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      isReadonly,
      isDisabled,
      isInvalid,

      noDisabledStyles,
      smallFocusOutline,

      type = "text",
      size = "md",

      id,
      name,
      value,

      placeholder,

      labelText,
      optionalText,
      helpText,
      errorText,

      leftIcon,
      rightIcon,
      clearIcon = <CloseIcon width="24" height="24" />,

      onKeyDown,
      onChange,
      onClearClick,
      onRightIconClick,
      onLeftIconClick,

      className,
      ...rest
    },
    ref,
  ) => {
    const divRef = useRef<HTMLDivElement>(null)

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    const togglePassword = () => {
      setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)
    }

    const handleLeftIconClick = () => {
      divRef.current?.focus()

      if (onLeftIconClick) {
        onLeftIconClick()
      }
    }

    const handleRightIconClick = () => {
      divRef.current?.focus()

      if (type === "password") {
        togglePassword()
      }

      if (onRightIconClick) {
        onRightIconClick()
      }
    }

    return (
      <div className="flex flex-col font-normal text-sm text-blue-700">
        {/* Label & Optional Text - Start */}
        {(labelText || optionalText) && (
          <div className="flex flex-row tracking-[0.16px] mb-1">
            <div className="flex-1">
              {labelText && (
                <label
                  data-testid="input-label"
                  htmlFor={id}
                  className={cx({ "cursor-pointer": !isDisabled })}
                >
                  {labelText}
                </label>
              )}
            </div>
            {optionalText && (
              <div
                data-testid="input-optional-text"
                className="text-blue-500 italic"
              >
                {optionalText}
              </div>
            )}
          </div>
        )}
        {/* Label & Optional Text - End */}

        {/* Input Container - Start */}
        <div
          ref={divRef}
          tabIndex={-1}
          className={cx(
            `
            inline-flex items-center
            bg-white ring-green-500 border border-blue-300 rounded outline-none
            text-blue-1000 placeholder:text-blue-600 tracking-[1%] fill-blue-500
            overflow-hidden
            px-2
          `,
            {
              "cursor-text focus-within:border-green-500":
                noDisabledStyles || !isDisabled,
              "focus-within:ring-1":
                !smallFocusOutline && (noDisabledStyles || !isDisabled),
              "bg-blue-100 border-blue-300 !text-blue-600":
                isDisabled && !noDisabledStyles,
              "!border-red-600 !ring-red-600": isInvalid,
            },
            className,
          )}
        >
          {/* Left Icon - Start */}
          {leftIcon && (
            <div
              data-testid="input-left-icon"
              className="mr-2"
              onClick={isDisabled ? undefined : handleLeftIconClick}
            >
              {leftIcon}
            </div>
          )}
          {/* Left Icon - End */}

          {/* Input Element - Start */}
          <input
            name={name}
            data-testid="input-element"
            aria-invalid={isInvalid}
            aria-readonly={isReadonly}
            id={id}
            ref={ref}
            type={
              type === "password"
                ? isPasswordVisible
                  ? "text"
                  : "password"
                : "text"
            }
            className={cx("bg-transparent outline-none w-full", {
              "h-[34px]": size === "md",
              "h-[38px]": size === "lg",
              "h-[38px] sm:h-[34px]": size === "lg-mobile",
            })}
            placeholder={placeholder}
            value={value}
            onChange={isDisabled || isReadonly ? undefined : onChange}
            onKeyDown={isDisabled || isReadonly ? undefined : onKeyDown}
            readOnly={isReadonly}
            disabled={isDisabled}
            {...rest}
          />
          {/* Input Element - End */}

          {/* Right Icon - Start */}
          {(type === "password" || rightIcon) && (
            <button
              data-testid="input-right-icon"
              type="button"
              className="h-6 w-6"
              onClick={isDisabled ? undefined : handleRightIconClick}
              disabled={isDisabled}
            >
              {type === "password" ? <EyeIcon /> : rightIcon}
            </button>
          )}
          {/* Right Icon - End */}

          {/* Clear Button - Start */}
          {typeof onClearClick !== "undefined" && (
            <button
              data-testid="input-clear-button"
              type="button"
              className="ml-1"
              onClick={isDisabled ? undefined : onClearClick}
              disabled={isDisabled}
            >
              {clearIcon}
            </button>
          )}
          {/* Clear Button - End */}
        </div>
        {/* Input Container - End */}

        {/* Help & Error Text - Start */}
        {(helpText || errorText) && (
          <div className="text-xs text-blue-600 tracking-[0.17px] mt-1">
            {isInvalid && errorText && (
              <p data-testid="input-error-text" className="text-red-800">
                {errorText}
              </p>
            )}
            {helpText && <p data-testid="input-help-text">{helpText}</p>}
          </div>
        )}
        {/* Help & Error Text - end */}
      </div>
    )
  },
)

if (__DEV__) {
  Input.displayName = "Input"
}

export default Input
