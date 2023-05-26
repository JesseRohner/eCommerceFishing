import cx from "classnames"
import Link from "next/link"
import { FormattedMessage } from "react-intl"

import Chevron from "@public/icons/chevron-down-small.svg"

import type { NavigationItem as NavigationItemType } from "@modules/Navigation"

type NavigationItemProps = NavigationItemType & {
  variant?: "default" | "compact"
  state?: "normal" | "active"

  hasChevron?: boolean
  hasChevronFlipped?: boolean

  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  href,
  icon: Icon,
  label,
  variant = "default",
  state = "normal",
  hasChevron,
  hasChevronFlipped,
  onClick,
}) => {
  const className = cx(
    "flex items-center rounded-lg w-full px-4 py-2 fill-blue-400 hover:bg-blue-800 hover:text-white hover:fill-white",
    {
      "py-1": variant === "compact",
      "py-2": variant === "default",
      "text-blue-400": state === "normal",
      "bg-blue-800 text-white !fill-white": state === "active",
    },
  )

  const NavigationItemContent = (
    <>
      <div className="flex items-center justify-center w-6 h-6 select-none">
        {Icon && <Icon fill="inherit" />}
      </div>

      <span className="ml-3">
        <FormattedMessage {...label} />
      </span>

      {hasChevron && (
        <div className="ml-auto -mr-2">
          <Chevron className={cx({ "rotate-180": hasChevronFlipped })} />
        </div>
      )}
    </>
  )

  if (typeof href !== "undefined") {
    return (
      <Link href={href}>
        <a className={className}>{NavigationItemContent}</a>
      </Link>
    )
  }

  return (
    <button className={className} onClick={onClick}>
      {NavigationItemContent}
    </button>
  )
}

export default NavigationItem
