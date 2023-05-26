import cx from "classnames"

import Button from "@components/Button"

import ExternalLargeIcon from "@public/icons/arrow-up-base.svg"
import Hourglass from "@public/icons/hourglass.svg"

export type ComingSoonProps = {
  hasNoDefaultSpacing?: boolean
  hasNoDefaultMaxWidth?: boolean
  hasNoMobileDefaultMaxWidth?: boolean
  isDefaultIconHidden?: boolean

  heading?: string
  description?: string

  feedbackUrl?: string

  className?: string
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  hasNoDefaultSpacing,
  hasNoDefaultMaxWidth,
  hasNoMobileDefaultMaxWidth,
  isDefaultIconHidden,

  heading = "Coming soon",
  description = "What would you like to see in ‘Projects’? Tell us by clicking the button below.",

  feedbackUrl = "https://help.pfnexus.com/",

  className,
}) => {
  return (
    <div
      data-testid="coming-soon-disclaimer"
      className={cx(
        "bg-white text-center space-y-1 sm:space-y-1.5 w-full",
        {
          "p-2": !hasNoDefaultSpacing,
          "max-w-[288px]": !hasNoMobileDefaultMaxWidth,
          "sm:max-w-[288px]": !hasNoDefaultMaxWidth,
        },
        className,
      )}
    >
      {!isDefaultIconHidden && (
        <Hourglass
          data-testid="coming-soon-disclaimer_default-icon"
          className="fill-gray-300 mx-auto"
        />
      )}

      {heading && (
        <h2
          data-testid="coming-soon-disclaimer_heading"
          className="text-blue-900 text-xl sm:text-2xl leading-7 sm:leading-8 tracking-[0.16px]"
        >
          {heading}
        </h2>
      )}

      {description && (
        <p
          data-testid="coming-soon-disclaimer_description"
          className="text-blue-600 text-sm leading-5 tracking-[0.17px]"
        >
          {description}
        </p>
      )}

      {feedbackUrl && (
        <Button
          className="!mt-4"
          leftIcon={<ExternalLargeIcon className="ml-1.5 -mr-1" />}
          onClick={() => {
            window.open(feedbackUrl, "_blank")
          }}
        >
          Give us feeback
        </Button>
      )}
    </div>
  )
}

export default ComingSoon
