import cx from "classnames"
import { forwardRef, MouseEventHandler } from "react"

import Avatar from "@components/Avatar"
import Badge from "@components/Badge"

import useAuth from "@services/Auth/Auth.context"

import LinkedInIcon from "@public/icons/linked-in.svg"

import { __DEV__ } from "@utils/env"

export type UserCardProps = {
  variant?: "compact" | "compact-2" | "card"
  colourScheme?: "dark-blue" | "white"
  borderStyle?: "top" | "full"

  isRounded?: boolean
  isBordered?: boolean
  displayBadge?: boolean
  displayLinkedIn?: boolean
  disableHover?: boolean

  onClick?: MouseEventHandler<HTMLDivElement>

  className?: string
}

export const UserCard = forwardRef<HTMLDivElement, UserCardProps>(
  (
    {
      variant = "compact",
      colourScheme = "dark-blue",
      borderStyle = "full",

      isRounded,
      isBordered,
      displayBadge,
      displayLinkedIn,
      disableHover = false,

      onClick,

      className,
    },
    ref,
  ) => {
    const { user, isAuthValid } = useAuth()

    if (!isAuthValid()) {
      return null
    }

    const firstName = user.firstname || ""
    const lastName = user.lastname || ""

    return (
      <div
        ref={ref}
        data-testid="user-card"
        className={cx(
          "flex w-full",
          {
            "cursor-pointer": typeof onClick !== "undefined",

            "bg-blue-900": colourScheme === "dark-blue",
            "hover:bg-blue-800": colourScheme === "dark-blue" && !disableHover,
            "bg-white": colourScheme === "white",
            "hover:bg-blue-100": colourScheme === "white" && !disableHover,

            "flex-row": variant === "compact" || variant === "compact-2",
            "flex-col": variant === "card",

            "px-[18px] py-3": variant === "compact",
            "px-4 py-[18px]": variant === "compact-2",
            "p-5": variant === "card",

            "space-y-5": variant === "card",
            "space-x-3": variant !== "card",

            "rounded-lg": isRounded,

            "items-center text-center": variant === "card",

            "border-blue-700": isBordered && colourScheme === "dark-blue",
            "hover:border-blue-800":
              isBordered && colourScheme === "dark-blue" && !disableHover,
            "border-blue-300": isBordered && colourScheme === "white",

            "border-t": isBordered && borderStyle === "top",
            border: isBordered && borderStyle === "full",
          },
          className,
        )}
        onClick={onClick}
      >
        <div>
          <Avatar
            value={`${firstName[0]}${lastName[0]}`}
            size={variant === "card" ? "xl" : "md"}
          />
        </div>

        <div
          className={cx("overflow-hidden", {
            "-mt-1": variant === "compact-2",
          })}
        >
          <p
            data-testid="user-card_full-name"
            className={cx({
              "text-white": colourScheme === "dark-blue",
              "text-blue-900": colourScheme === "white",

              "text-sm": variant === "compact",
              "text-base": variant !== "compact",
            })}
          >
            {firstName} {lastName}
          </p>

          <p
            data-testid="user-card_description"
            className={cx("truncate", {
              // TODO: Deal with hardcoded colour
              "text-[#BCC6CC]": colourScheme === "dark-blue",
              "text-blue-600": colourScheme === "white" && variant !== "card",
              "text-blue-700": colourScheme === "white" && variant === "card",

              "text-xs": variant === "compact",
              "text-sm": variant !== "compact",
            })}
          >
            {[user.jobtitle, user.company].join(", ")}
          </p>

          {displayBadge && !!user.permissions?.length && (
            <Badge
              size={variant === "card" ? "md" : "sm"}
              value={
                user.permissions.includes("DBPro")
                  ? "PREMIUM USER"
                  : "FREE USER"
              }
              className={cx({ "mt-3": variant === "card" })}
            />
          )}

          {displayLinkedIn && user.linkedinurl && (
            <a href={user.linkedinurl} rel="noreferrer" target="_blank">
              <LinkedInIcon
                data-testid="user-card_linkedin-link"
                className={cx("fill-blue-500", {
                  "mt-1": variant === "compact-2",
                  "mx-auto mt-2": variant === "card",
                })}
              />
            </a>
          )}
        </div>
      </div>
    )
  },
)

if (__DEV__) {
  UserCard.displayName = "UserCard"
}

export default UserCard
