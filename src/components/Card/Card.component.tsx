import cx from "classnames"
import Link from "next/link"

import ArrowRightIcon from "@public/icons/arrow-right.svg"

type CardProps = {
  size?: "md" | "sm"

  headingText?: string
  showMoreURL?: string

  children: React.ReactNode

  className?: string
}

const Card: React.FC<CardProps> = ({
  size = "md",

  headingText,
  showMoreURL,

  children,

  className,
}) => (
  <div
    className={cx(
      "bg-white h-full rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.12)]",
      {
        "pt-3 sm:pt-4": size === "md",
        "pt-[10px]": size === "sm",
      },
      className,
    )}
  >
    {(headingText || showMoreURL) && (
      <div
        className={cx("border-b border-blue-300", {
          "px-4 pb-3 sm:px-5 sm:pb-4": size === "md",
          "px-4 pb-[10px]": size === "sm",
          "flex justify-between items-center": headingText,
          "block text-right": !headingText,
        })}
      >
        {headingText && (
          <h1
            className={cx("font-medium text-blue-900", {
              "text-base sm:text-lg sm:leading-6": size === "md",
              "text-base": size === "sm",
            })}
          >
            {headingText}
          </h1>
        )}
        {showMoreURL && (
          <Link href={showMoreURL}>
            <a
              className={cx("font-medium text-sm text-blue-600", {
                flex: headingText,
                block: !headingText,
              })}
            >
              <span>More</span>
              <ArrowRightIcon className="inline-flex w-5 h-5 ml-1 fill-blue-600" />
            </a>
          </Link>
        )}
      </div>
    )}
    <div
      className={cx("overflow-y-auto", {
        "h-[calc(100%-36px)] sm:h-[calc(100%-40px)]":
          size === "md" && (headingText || showMoreURL),
        "h-[calc(100%-34px)]": size === "sm" && (headingText || showMoreURL),
        "h-full": !headingText && !showMoreURL,
      })}
    >
      {children}
    </div>
  </div>
)

export default Card
