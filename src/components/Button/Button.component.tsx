import cx from "classnames"
import { cloneElement, forwardRef } from "react"

import { __DEV__ } from "@utils/env"

import CloseIconSVG from "@public/icons/close.svg"

import { ButtonProps } from "./Button.types"

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isLoading,
      isDisabled: _isDisabled,
      isFullWidth,

      noDisabledStyles = false,
      noVerticalPadding = false,

      // TODO: Get translated string
      loadingText = "Loading",

      type = "button",

      shape = "rectangle",
      colourScheme = "teal",
      variant = "solid",

      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      closeIcon: CloseIcon = <CloseIconSVG />,

      onClick,
      onCloseClick,

      className,
      disabledClassName,

      children,
    },
    ref,
  ) => {
    const colourSchemeStyles: {
      [k in typeof variant]: {
        [k in typeof colourScheme]: {
          background: string
          backgroundHover: string
          borderColour: string
          textColour: string
          iconColour: string
        }
      }
    } = {
      solid: {
        teal: {
          background: "bg-green-500",
          backgroundHover: "hover:bg-green-600",
          borderColour: "border-transparent",
          textColour: "text-blue-900",
          iconColour: "fill-blue-900",
        },
        blue: {
          background: "bg-blue-400",
          backgroundHover: "hover:bg-blue-500",
          borderColour: "border-transparent",
          textColour: "text-blue-900",
          iconColour: "fill-blue-900",
        },
        red: {
          background: "bg-red-700",
          backgroundHover: "hover:bg-red-800",
          borderColour: "border-transparent",
          textColour: "text-white",
          iconColour: "fill-white",
        },
        white: {
          background: "bg-white",
          backgroundHover: "hover:bg-blue-100",
          borderColour: "border-transparent",
          textColour: "text-blue-600",
          iconColour: "fill-blue-600",
        },
        purple: {
          background: "bg-purple-500",
          backgroundHover: "hover:bg-purple-600",
          borderColour: "border-transparent",
          textColour: "text-white",
          iconColour: "fill-white",
        },
        yellow: {
          background: "bg-yellow-500",
          backgroundHover: "hover:bg-yellow-600",
          borderColour: "border-transparent",
          textColour: "text-blue-900",
          iconColour: "fill-blue-900",
        },
        darkBlue: {
          background: "bg-[#2867B2]",
          backgroundHover: "hover:bg-[#0F4E99]",
          borderColour: "border-transparent",
          textColour: "text-white",
          iconColour: "fill-white",
        },
      },
      outline: {
        teal: {
          background: "bg-green-500/10",
          backgroundHover: "hover:bg-green-500/20",
          borderColour: "border-green-500",
          textColour: "text-blue-900",
          iconColour: "fill-blue-900",
        },
        blue: {
          background: "bg-blue-400/20",
          backgroundHover: "hover:bg-blue-400/40",
          borderColour: "border-blue-400",
          textColour: "text-blue-900",
          iconColour: "fill-blue-900",
        },
        red: {
          background: "bg-red-700/10",
          backgroundHover: "hover:bg-red-700/20",
          borderColour: "border-red-700",
          textColour: "text-red-800",
          iconColour: "fill-red-800",
        },
        white: {
          background: "bg-white",
          backgroundHover: "hover:bg-blue-100",
          borderColour: "border-blue-300",
          textColour: "text-blue-600",
          iconColour: "fill-blue-600",
        },
        purple: {
          background: "bg-purple-500/10",
          backgroundHover: "hover:bg-purple-600/20",
          borderColour: "border-purple-500",
          textColour: "text-purple-500",
          iconColour: "fill-purple-500",
        },
        yellow: {
          background: "bg-yellow-500/10",
          backgroundHover: "hover:bg-yellow-600/20",
          borderColour: "border-yellow-500",
          textColour: "text-yellow-500",
          iconColour: "fill-yellow-500",
        },
        darkBlue: {
          background: "bg-[#2867B2]",
          backgroundHover: "hover:bg-[#0F4E99]",
          borderColour: "border-transparent",
          textColour: "text-white",
          iconColour: "fill-white",
        },
      },
      ghost: {
        teal: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-green-500/20",
          borderColour: "border-transparent",
          textColour: "text-blue-900",
          iconColour: "fill-blue-900",
        },
        blue: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-blue-400/40",
          borderColour: "border-transparent",
          textColour: "text-blue-900",
          iconColour: "fill-blue-900",
        },
        red: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-red-700/10",
          borderColour: "border-transparent",
          textColour: "text-red-700",
          iconColour: "fill-red-700",
        },
        white: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-blue-100",
          borderColour: "border-transparent",
          textColour: "text-blue-600",
          iconColour: "fill-blue-600",
        },
        purple: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-purple-100",
          borderColour: "border-transparent",
          textColour: "text-purple-500",
          iconColour: "fill-purple-500",
        },
        yellow: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-yellow-100",
          borderColour: "border-transparent",
          textColour: "text-yellow-500",
          iconColour: "fill-yellow-500",
        },
        darkBlue: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-[#0F4E99]/10",
          borderColour: "border-transparent",
          textColour: "text-[#0F4E99]",
          iconColour: "fill-[#0F4E99]",
        },
      },
      tab: {
        teal: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-blue-100",
          borderColour: "border-green-500",
          textColour: "text-blue-600",
          iconColour: "fill-blue-600",
        },
        blue: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-blue-100",
          borderColour: "border-blue-400",
          textColour: "text-blue-600",
          iconColour: "fill-blue-600",
        },
        red: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-blue-100",
          borderColour: "border-red-700",
          textColour: "text-blue-600",
          iconColour: "fill-blue-600",
        },
        white: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-blue-100",
          borderColour: "border-blue-300",
          textColour: "text-blue-600",
          iconColour: "fill-blue-600",
        },
        purple: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-blue-100",
          borderColour: "border-purple-500",
          textColour: "text-blue-600",
          iconColour: "fill-blue-600",
        },
        yellow: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-blue-100",
          borderColour: "border-yellow-500",
          textColour: "text-blue-600",
          iconColour: "fill-blue-600",
        },
        darkBlue: {
          background: "bg-transparent",
          backgroundHover: "hover:bg-blue-100",
          borderColour: "border-[#0F4E99]",
          textColour: "text-[#0F4E99]",
          iconColour: "fill-[#0F4E99]",
        },
      },
    }

    const shapeStyles: {
      [k in typeof shape]: {
        size: string
        font: string
        borderRadius: string
        padding: string
        paddingWithIcon: string
        contentMarginWithIcon: string
        iconSize: string
        closeIconButtonSize: string
        closeIconButtonBorderRadius: string
      }
    } = {
      rectangle: {
        size: "h-[40px]",
        font: "font-medium uppercase tracking-[0.4px]",
        borderRadius: variant === "tab" ? "rounded-none" : "rounded",
        padding: variant === "tab" ? "px-3" : "px-[14px]",
        paddingWithIcon: "px-[10px]",
        contentMarginWithIcon: "mx-[9px]",
        iconSize: "w-6",
        closeIconButtonSize: "w-[24px] h-[24px]",
        closeIconButtonBorderRadius: "rounded",
      },
      "rectangle-2": {
        size: "h-[36px]",
        font: "font-normal tracking-[1%]",
        borderRadius: "rounded",
        padding: "px-[13px]",
        paddingWithIcon: "px-[10px]",
        contentMarginWithIcon: "",
        iconSize: "w-6",
        closeIconButtonSize: "w-[24px] h-[24px]",
        closeIconButtonBorderRadius: "rounded",
      },
      pill: {
        size: "h-[32px]",
        font: "font-normal tracking-normal",
        borderRadius: "rounded-2xl",
        padding: "px-[11.5px]",
        paddingWithIcon: "px-[10px]",
        contentMarginWithIcon: "mx-[6px]",
        iconSize: "w-[17px]",
        closeIconButtonSize: "w-7 h-7",
        closeIconButtonBorderRadius: "rounded-full",
      },
    }

    const {
      background,
      backgroundHover,
      borderColour,
      textColour,
      iconColour,
    } = colourSchemeStyles[variant][colourScheme]

    const {
      size,
      font,
      borderRadius,
      padding,
      paddingWithIcon,
      contentMarginWithIcon,
      iconSize,
      closeIconButtonSize,
      closeIconButtonBorderRadius,
    } = shapeStyles[shape]

    const activeStyles =
      "active:border-green-500 active:ring-1 ring-green-500 ring-inset"

    const isDisabled = _isDisabled || isLoading

    const buttonClassName = cx(
      // Default styles
      `
        inline-flex flex-row items-center justify-center
        relative select-none whitespace-nowrap align-middle
        border-transparent
        text-sm leading-5
      `,

      {
        border: variant !== "tab",
        "border-b-2": variant === "tab",

        "cursor-default": noDisabledStyles ? onClick : _isDisabled || !onClick,
        "cursor-pointer": noDisabledStyles ? onClick : !_isDisabled && onClick,
        "cursor-wait": isLoading,

        // Colour Scheme
        [background]: noDisabledStyles || !isDisabled,
        [backgroundHover]:
          noDisabledStyles || (!isDisabled && typeof onClick !== "undefined"),
        [borderColour]: noDisabledStyles || !isDisabled,
        [textColour]: noDisabledStyles || !isDisabled,
        [iconColour]: noDisabledStyles || !isDisabled,

        [activeStyles]:
          variant !== "tab" &&
          (!noDisabledStyles ||
            (!isDisabled && typeof onClick !== "undefined")),
        "active:bg-blue-200":
          variant === "tab" &&
          (!noDisabledStyles ||
            (!isDisabled && typeof onClick !== "undefined")),

        // Disabled & Loading styles
        [`
          bg-[#EBF1F5] text-blue-600 text-opacity-80 fill-blue-600 fill-opacity-80
          hover:bg-[#EBF1F5] hover:text-blue-600 hover:text-opacity-80
          active:bg-[#EBF1F5] active:text-blue-600 active:text-opacity-80
          pointer-none
          ${disabledClassName}
        `]: isDisabled && !noDisabledStyles,
      },

      // Shape
      size,
      borderRadius,
      font,

      className,
    )

    const HTMLNode = typeof onCloseClick !== "undefined" ? "span" : "button"

    return (
      <HTMLNode
        ref={ref}
        data-testid="button"
        type={type}
        className={buttonClassName}
        onClick={
          isDisabled || typeof onClick === "undefined" ? undefined : onClick
        }
        disabled={isDisabled}
      >
        {isLoading ? (
          <div
            className={cx("inline-flex items-center justify-center", {
              [padding]: !(LeftIcon || RightIcon) && !noVerticalPadding,
              [paddingWithIcon]: (LeftIcon || RightIcon) && !noVerticalPadding,
            })}
          >
            {loadingText}
          </div>
        ) : (
          <>
            <div
              className={cx("inline-flex items-center", {
                [padding]: !(LeftIcon || RightIcon) && !noVerticalPadding,
                [paddingWithIcon]:
                  (LeftIcon || RightIcon) && !noVerticalPadding,
                "pr-0": typeof onCloseClick !== "undefined",
                "justify-center": !isFullWidth,
                "w-full justify-between": isFullWidth,
              })}
            >
              {LeftIcon &&
                cloneElement(LeftIcon, {
                  ["data-testid"]: "left-icon",
                  fill: "inherit",
                  ...LeftIcon.props,
                  className: cx(iconSize, LeftIcon.props.className),
                })}

              <span
                className={cx({
                  [contentMarginWithIcon]: LeftIcon || RightIcon,
                  "ml-0": !LeftIcon,
                  "mr-0": !RightIcon,
                })}
              >
                {children}
              </span>

              {RightIcon &&
                cloneElement(RightIcon, {
                  ["data-testid"]: "right-icon",
                  fill: "inherit",
                  ...RightIcon.props,
                  className: cx(iconSize, RightIcon.props.className),
                })}
            </div>

            {typeof onCloseClick !== "undefined" && (
              <button
                type="button"
                data-testid="close-button"
                className={cx(
                  "flex items-center justify-center ml-1 mr-px",
                  closeIconButtonSize,
                  closeIconButtonBorderRadius,
                  activeStyles,
                  backgroundHover,
                  iconColour,
                )}
                onClick={
                  isDisabled
                    ? undefined
                    : (e) => {
                        e.stopPropagation()
                        onCloseClick(e)
                      }
                }
                disabled={isDisabled}
              >
                {cloneElement(CloseIcon, {
                  ["data-testid"]: "close-button-icon",
                  fill: "inherit",
                  ...CloseIcon.props,
                  className: cx("w-[17px]", CloseIcon.props.className),
                })}
              </button>
            )}
          </>
        )}
      </HTMLNode>
    )
  },
)

if (__DEV__) {
  Button.displayName = "Button"
}

export default Button
