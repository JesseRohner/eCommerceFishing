import cx from "classnames"
import React from "react"

import ExternalLinkIcon from "@public/icons/external.svg"

type ExternalLinkProps = {
  href: string
  isDefaultStyleDisabled?: boolean
  isDefaultIconHidden?: boolean

  iconPosition?: "start" | "end"
  colourScheme?: "inherit" | "blue-600" | "purple-500"

  className?: string
  children: React.ReactNode
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,

  isDefaultStyleDisabled,
  isDefaultIconHidden,

  iconPosition = "end",
  colourScheme = "blue-600",

  className,
  children,
}) => {
  return (
    <a
      data-testid="external-link"
      rel="noreferrer"
      href={href}
      target="_blank"
      className={
        isDefaultStyleDisabled
          ? className
          : cx(
              "group font-normal text-sm leading-4",
              {
                "text-inherit fill-inherit": colourScheme === "inherit",
                "text-blue-600 fill-blue-600": colourScheme === "blue-600",
                "text-purple-500 fill-purple-500":
                  colourScheme === "purple-500",
              },
              className,
            )
      }
    >
      {!isDefaultIconHidden && iconPosition === "start" && (
        <ExternalLinkIcon
          data-testid="external-link_default-icon"
          className="fill-inherit inline-block mr-[5px]"
        />
      )}

      <span className="underline group-hover:no-underline">{children}</span>

      {!isDefaultIconHidden && iconPosition === "end" && (
        <ExternalLinkIcon
          data-testid="external-link_default-icon"
          className="fill-inherit inline-block ml-[5px]"
        />
      )}
    </a>
  )
}

export default ExternalLink
