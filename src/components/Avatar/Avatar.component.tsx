import cx from "classnames"
import { forwardRef, MouseEventHandler } from "react"

import { __DEV__ } from "@utils/env"

type AvatarProps = {
  size?: "md" | "xl"

  value: string

  onClick?: MouseEventHandler<HTMLDivElement>

  className?: string
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = "md", value, onClick, className }, ref) => (
    <div
      data-testid="avatar"
      ref={ref}
      onClick={onClick}
      className={cx(
        "inline-flex items-center justify-center",
        "rounded-full",
        "bg-purple-500 text-white",
        {
          "w-9 h-9": size === "md",
          "w-24 h-24": size === "xl",

          "text-lg": size === "md",
          "text-[48px]": size === "xl",
        },
        className,
      )}
    >
      {value}
    </div>
  ),
)

if (__DEV__) {
  Avatar.displayName = "Avatar"
}

export default Avatar
