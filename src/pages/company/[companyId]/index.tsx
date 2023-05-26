import cx from "classnames"
import { GetServerSidePropsContext, NextPage } from "next"
import { useState } from "react"
import { FormattedMessage } from "react-intl"
import { dehydrate, QueryClient } from "react-query"

import CompanyLayout from "@layouts/Company"

import Button from "@components/Button"
import ExternalLink from "@components/ExternalLink"

import {
  fetchCompany,
  QUERY_KEY as COMPANIES_ENDPOINT_KEY,
  useCompany,
} from "@hooks/api/useCompanies"

import { getTechnologyFamilyByValue } from "@utils/getTechnologies"
import { parseUrlForInfoDisplay } from "@utils/url"

import ArrowDownIcon from "@public/icons/arrow-down.svg"
import GlobeIcon from "@public/icons/globe.svg"
import LinkedInIcon from "@public/icons/linked-in.svg"
import LocationIcon from "@public/icons/location.svg"
import UserIcon from "@public/icons/user.svg"

export const cardClassName =
  "bg-white rounded-lg drop-shadow-md px-5 pt-4 pb-6 text-blue-600 text-sm font-normal leading-6 fill-blue-500"
export const strongClassName =
  "[&_strong]:font-medium [&_strong]:leading-5 [&_strong]:tracking-[0.16px]"
export const paragraphClassName = "[&_p]:mb-5 last-of-type:[&_p]:mb-0"

const CompanyOverview: NextPage<any> = ({ query }) => {
  const { data: { data: companyData } = {} } = useCompany(
    query.companyId as string,
  )
  const [isOverviewCardOpen, setIsOverviewCardOpen] = useState<boolean>(false)

  const {
    technology_families,
    founded_year,
    sectors,
    hq_text,
    description,
    employee_band,
    website,
    linkedin_page,
  } = companyData || {}

  return (
    <CompanyLayout query={query}>
      <div
        className={cx("flex flex-col lg:flex-row space-y-4 lg:space-y-0", {
          "lg:space-x-8": description && description.length,
        })}
      >
        {!!description && (
          <div className="flex-1">
            <div
              className={cx(cardClassName, strongClassName, paragraphClassName)}
            >
              <strong>Overview</strong>

              <div
                className={cx("relative overflow-hidden mb-2 sm:mb-0", {
                  "h-24 sm:h-auto": !isOverviewCardOpen,
                })}
              >
                {description.split("\n").map((paragraph: string) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div
                  className={cx(
                    "h-16 absolute left-0 bottom-0 right-0 bg-gradient-to-t from-white to-transparent",
                    {
                      "sm:hidden": !isOverviewCardOpen,
                      hidden: isOverviewCardOpen,
                    },
                  )}
                />
              </div>

              <Button
                shape="rectangle"
                variant="outline"
                colourScheme="white"
                leftIcon={
                  <ArrowDownIcon
                    className={cx("text-blue-500", {
                      "rotate-180": isOverviewCardOpen,
                    })}
                  />
                }
                noDisabledStyles
                onClick={() => {
                  setIsOverviewCardOpen(!isOverviewCardOpen)
                }}
                className="inline-flex sm:hidden"
              >
                {isOverviewCardOpen ? "Collapse overview" : "Full overview"}
              </Button>
            </div>
          </div>
        )}

        {Array.isArray(technology_families) && technology_families.length > 0 && (
          <div className="flex-1 block sm:hidden">
            <div
              className={cx(cardClassName, strongClassName, paragraphClassName)}
            >
              <strong>Technologies</strong>

              <div className="mt-3 -mb-2 flex flex-wrap gap-2">
                {technology_families
                  .map(getTechnologyFamilyByValue)
                  .filter(Boolean)
                  .map((t) => (
                    <Button
                      key={`company-overview_mobile-technology-${t!.label.id}`}
                      shape="pill"
                      variant="outline"
                      colourScheme="white"
                      isDisabled
                      noDisabledStyles
                    >
                      <FormattedMessage {...t?.label} />
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {(founded_year ||
          sectors ||
          hq_text ||
          (employee_band && employee_band !== "Unknown") ||
          website ||
          linkedin_page) && (
          <div className="flex-1">
            <div
              className={cx(cardClassName, strongClassName, paragraphClassName)}
            >
              {!!founded_year && (
                <>
                  <strong>Founded</strong>
                  <p>{founded_year}</p>
                </>
              )}

              {!!sectors?.length && (
                <>
                  <strong>Sectors</strong>
                  <p>{sectors}</p>
                </>
              )}

              {(!!founded_year || !!sectors?.length) && (
                <div className="w-full h-px bg-blue-300 my-5" />
              )}

              <ul className="space-y-5 [&_li]:flex [&_li]:items-center">
                {!!hq_text && (
                  <li>
                    <span className="inline-flex justify-center w-6 h-5 mr-[10px]">
                      <LocationIcon className="fill-inherit" />
                    </span>
                    {hq_text}
                  </li>
                )}

                {!!employee_band && employee_band !== "Unknown" && (
                  <li>
                    <span className="inline-flex justify-center w-6 h-5 mr-[10px]">
                      <UserIcon className="fill-inherit" />
                    </span>
                    {employee_band}
                  </li>
                )}

                {!!website && (
                  <li>
                    <span className="inline-flex justify-center w-6 h-5 mr-[10px]">
                      <GlobeIcon className="fill-inherit" />
                    </span>
                    <ExternalLink href={website}>
                      {parseUrlForInfoDisplay(website)}
                    </ExternalLink>
                  </li>
                )}

                {!!linkedin_page && (
                  <li>
                    <span className="inline-flex justify-center w-6 h-5 mr-[10px] -mt-1">
                      <LinkedInIcon className="fill-inherit" />
                    </span>
                    <ExternalLink href={linkedin_page}>
                      {parseUrlForInfoDisplay(linkedin_page)}
                    </ExternalLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </CompanyLayout>
  )
}

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  if (!query.companyId) {
    return {
      props: {
        query,
        dehydratedState: {},
      },
    }
  }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(
    [`${COMPANIES_ENDPOINT_KEY}/${query.companyId}`],
    () => fetchCompany(query.companyId! as string),
  )

  return {
    props: { query, dehydratedState: dehydrate(queryClient) },
  }
}

export default CompanyOverview
