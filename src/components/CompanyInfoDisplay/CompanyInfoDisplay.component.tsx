import cx from "classnames"
import Image, { StaticImageData } from "next/image"

import Button from "@components/Button"
import ExternalLink from "@components/ExternalLink"

import { parseUrlForInfoDisplay } from "@utils/url"

import ExternalLargeIcon from "@public/icons/arrow-up-base.svg"

export type CompanyInfoDisplayProps = {
  variant?: "news-post" | "company-info"

  imageUrl?: string | StaticImageData

  date?: string
  heading?: string
  subHeading?: string

  externalLink?: string
  companyProfileId?: string
  linkedInUrl?: string

  className?: string

  children: React.ReactNode
}

const CompanyInfoDisplay: React.FC<CompanyInfoDisplayProps> = ({
  variant = "news-post",

  imageUrl,

  date,
  heading,
  subHeading,

  externalLink,
  companyProfileId,
  linkedInUrl,

  className,

  children,
}) => {
  const hasContentToSeparate =
    Boolean(imageUrl) &&
    (Boolean(date) ||
      Boolean(heading) ||
      Boolean(subHeading) ||
      Boolean(externalLink) ||
      Boolean(companyProfileId) ||
      Boolean(linkedInUrl) ||
      Boolean(children))

  return (
    <div
      data-testid="company-info-display"
      className={cx(
        "flex py-4 px-4 sm:px-5 bg-white hover:bg-blue-100",
        {
          "space-x-4 sm:space-x-5":
            hasContentToSeparate && variant === "news-post",
          "sm:space-x-6 space-y-3 sm:space-y-0":
            hasContentToSeparate && variant === "company-info",
          "flex-col sm:flex-row": variant === "company-info",
        },
        className,
      )}
    >
      {imageUrl && (
        <div
          className={cx(
            "relative rounded-[4px] sm:rounded-lg overflow-hidden shrink-0",
            {
              "w-[63px] h-[63px] sm:w-24 sm:h-24": variant === "news-post",
              "w-20 h-20 sm:w-[84px] sm:h-[84px]": variant === "company-info",
            },
          )}
        >
          <Image
            data-testid="company-info-display_image"
            src={imageUrl!}
            layout="fill"
          />
        </div>
      )}

      <div
        className={cx(
          "text-blue-600 font-normal text-sm leading-4 tracking-[0.16px]",
          {
            "space-y-2": variant === "news-post",
            "space-y-3": variant === "company-info",
          },
        )}
      >
        {heading && (
          <h2
            data-testid="company-info-display_heading"
            className={cx("font-medium leading-5", {
              "text-blue-900 text-base sm:text-xl sm:leading-6":
                variant === "news-post",
              // TODO: Hardcoded colour
              "text-[#070B14] text-lg": variant === "company-info",
            })}
          >
            {heading}
          </h2>
        )}

        {subHeading && (
          <p
            data-testid="company-info-display_subheading"
            className="uppercase"
          >
            {subHeading}
          </p>
        )}

        {date && <p data-testid="company-info-display_date">{date}</p>}

        <div>{children}</div>

        {externalLink && (
          <ExternalLink
            href={externalLink}
            iconPosition="start"
            className="inline-block"
          >
            Read on {parseUrlForInfoDisplay(externalLink)}
          </ExternalLink>
        )}

        {companyProfileId && (
          <Button
            variant="outline"
            colourScheme="white"
            className="!mt-3 !sm:mt-4"
          >
            Company Profile
          </Button>
        )}

        {linkedInUrl && (
          <Button
            variant="outline"
            colourScheme="white"
            className="!mt-3 !sm:mt-4"
            leftIcon={<ExternalLargeIcon className="ml-1 -mr-1.5" />}
            onClick={() => {
              window.open(linkedInUrl, "_blank")
            }}
          >
            View on LinkedIn
          </Button>
        )}
      </div>
    </div>
  )
}

export default CompanyInfoDisplay
