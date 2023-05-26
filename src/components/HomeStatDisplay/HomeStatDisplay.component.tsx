import cx from "classnames"
import Tooltip from "rc-tooltip"

import InfoIcon from "@public/icons/info.svg"

type HomeStatDisplayProps = {
  label: string
  tooltipContent?: string
  value: string
  colourScheme?: "gray" | "dark-blue" | "green"
}

const HomeStatDisplay: React.FC<HomeStatDisplayProps> = ({
  label,
  tooltipContent,
  value,
  colourScheme = "gray",
}) => {
  return (
    <div
      className={cx(
        "p-3 sm:py-4 sm:px-5 w-full rounded-lg",
        { "bg-blue-400": colourScheme === "gray" },
        { "bg-blue-800": colourScheme === "dark-blue" },
        { "bg-green-600": colourScheme === "green" },
      )}
    >
      <div className="flex items-center mb-2">
        <span
          className={cx(
            "text-xs sm:text-sm opacity-[0.85] tracking-[0.17px] capitalize flex items-center",
            {
              "text-blue-700": colourScheme === "gray",
              "text-white": colourScheme !== "gray",
            },
          )}
        >
          {label}
        </span>
        {tooltipContent && (
          <Tooltip
            overlay={<span>{tooltipContent}</span>}
            placement="bottomLeft"
            overlayClassName="pfn-tooltip"
          >
            <div>
              <InfoIcon
                className={cx(
                  "pfn-tooltip__svg pfn-tooltip__svg--rounded",
                  "ml-1 w-6 h-6 sm:w-7 sm:h-7",
                  {
                    "fill-blue-500": colourScheme === "gray",
                    "fill-white": colourScheme !== "gray",
                  },
                )}
              />
            </div>
          </Tooltip>
        )}
      </div>
      <span
        className={cx(
          "font-medium text-[28px] sm:text-[32px] leading-8 sm:leading-10",
          {
            "text-white": colourScheme !== "gray",
            "text-blue-900": colourScheme === "gray",
          },
        )}
      >
        {value}
      </span>
    </div>
  )
}

export default HomeStatDisplay
