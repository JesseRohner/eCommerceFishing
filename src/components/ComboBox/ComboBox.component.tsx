import cx from "classnames"
import {
  forwardRef,
  PropsWithChildren,
  Ref,
  useCallback,
  useRef,
  useState,
} from "react"

import AutoComplete, {
  AutocompleteItem,
  AutoCompleteProps,
} from "@components/AutoComplete"
import Input, { InputProps } from "@components/Input"

import useOnClickOutside from "@hooks/useOnClickOutside"

import { __DEV__ } from "@utils/env"

import SpinnerIcon from "@public/icons/load-static.svg"

export type ComboBoxProps<T> = Partial<Pick<AutoCompleteProps, "size">> &
  Pick<
    InputProps,
    | "id"
    | "name"
    | "labelText"
    | "optionalText"
    | "helpText"
    | "errorText"
    | "isInvalid"
    | "onChange"
    | "onClearClick"
  > & {
    size: "sm" | "md"

    data: Array<T>

    isLoading?: boolean
    isFetched?: boolean

    hasValue?: boolean

    onItemClick?: (item: T) => void

    className?: string
    autocompleteClassName?: string
  }

const ComboBox = forwardRef(
  <T extends AutocompleteItem>(
    {
      size = "sm",

      data,

      isLoading,
      isInvalid,

      hasValue,

      onItemClick,
      onClearClick,

      className,
      autocompleteClassName,

      ...rest
    }: PropsWithChildren<ComboBoxProps<T>>,
    ref: Ref<HTMLInputElement>,
  ) => {
    const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>

    const [renderAutocomplete, setRenderAutocomplete] = useState(false)

    const setRenderAutocompleteFalse = useCallback(
      () => setRenderAutocomplete(false),
      [],
    )

    useOnClickOutside(containerRef, setRenderAutocompleteFalse)

    const handleItemClick = (item: T) => {
      if (onItemClick) {
        onItemClick(item)
      }

      setRenderAutocomplete(false)
    }

    return (
      <div
        ref={containerRef}
        onFocus={(e) => {
          if (e.target.tagName === "INPUT") {
            setRenderAutocomplete(true)
          }
        }}
        className={cx("relative w-full max-w-xs", className)}
      >
        <Input
          ref={ref}
          rightIcon={
            isLoading ? (
              <SpinnerIcon className="w-4 stroke-blue-500 stroke-2 animate-spin" />
            ) : undefined
          }
          onClearClick={
            hasValue
              ? (e) => {
                  if (onClearClick) {
                    onClearClick(e)
                  }

                  setRenderAutocomplete(false)
                }
              : undefined
          }
          isInvalid={isInvalid}
          {...rest}
        />
        {!isLoading && hasValue && renderAutocomplete && (
          <div
            className={cx("absolute left-0 right-0 z-10", {
              "mt-px": !isInvalid,
              "-mt-3": isInvalid,
            })}
          >
            <AutoComplete
              size={size}
              data={data}
              className={cx("max-h-72", autocompleteClassName)}
              onItemClick={handleItemClick}
            />
          </div>
        )}
      </div>
    )
  },
)

if (__DEV__) {
  ComboBox.displayName = "ComboBox"
}

export default ComboBox
