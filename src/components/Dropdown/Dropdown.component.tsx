import cx from "classnames"
import { forwardRef, useEffect, useRef, useState } from "react"
import ReactDropdown, { ReactDropdownProps } from "react-dropdown"
import { RegisterOptions } from "react-hook-form"

import ChevronDown from "@public/icons/chevron-down-small.svg"

import { __DEV__ } from "@utils/env"

export type DropdownProps = Pick<
  ReactDropdownProps,
  | "placeholder"
  | "options"
  | "value"
  | "arrowClosed"
  | "arrowOpen"
  | "className"
  | "controlClassName"
  | "menuClassName"
> &
  Pick<RegisterOptions, "onChange" | "onBlur"> & {
    name?: string

    labelText?: string
    errorText?: string

    setFormValue?: Function

    isInvalid?: boolean
    isDisabled?: boolean
  }

const Dropdown = forwardRef<HTMLInputElement, DropdownProps>(
  (
    {
      placeholder = "Select a value",

      labelText,
      errorText,

      options = [],
      value,

      setFormValue,

      arrowClosed = (
        <ChevronDown className="absolute right-1.5 top-1.5 stroke-blue-400" />
      ),
      arrowOpen = (
        <ChevronDown className="absolute right-1.5 top-1.5 stroke-blue-400 rotate-180" />
      ),

      isInvalid,
      isDisabled,

      className,
      controlClassName,
      menuClassName,

      ...rest
    },
    ref,
  ) => {
    const dropdownRef = useRef() as React.MutableRefObject<ReactDropdown>
    const [dropdownValue, setDropdownValue] =
      useState<ReactDropdownProps["value"]>("")

    useEffect(() => {
      if (setFormValue) {
        setFormValue(
          rest.name,
          (typeof dropdownValue === "object"
            ? dropdownValue.value
            : dropdownValue) as string,
        )
      }
    }, [dropdownValue])

    return (
      <div>
        <input ref={ref} type="hidden" {...rest} />

        {labelText && (
          <div className="mb-1">
            <label
              className="font-normal text-sm text-blue-700 tracking-[0.16px] cursor-pointer"
              onClick={(e) => {
                dropdownRef.current.setState({ isOpen: true })
              }}
            >
              {labelText}
            </label>
          </div>
        )}

        <ReactDropdown
          ref={dropdownRef}
          placeholder={placeholder}
          options={options}
          value={value}
          onChange={setDropdownValue}
          arrowOpen={arrowOpen}
          arrowClosed={arrowClosed}
          className={cx("text-sm text-[#070B14]", className)}
          controlClassName={cx(
            "!rounded hover:!shadow-none !cursor-pointer",
            {
              "!border-blue-300": !isInvalid,
              "!border-red-600": isInvalid,
            },
            controlClassName,
          )}
          menuClassName={cx(
            "!border-blue-300 !rounded !mt-1 !shadow-none [&>div]:!text-[#070B14] [&>div:hover]:bg-blue-100 [&>div.is-selected]:bg-blue-100",
            menuClassName,
          )}
          arrowClassName=""
          disabled={isDisabled}
        />

        {isInvalid && errorText && (
          <p className="mt-1 text-xs tracking-[0.17px] text-red-800">
            {errorText}
          </p>
        )}
      </div>
    )
  },
)

if (__DEV__) {
  Dropdown.displayName = "Dropdown"
}

export default Dropdown
