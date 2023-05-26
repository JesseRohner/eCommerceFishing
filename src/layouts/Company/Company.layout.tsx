import cx from "classnames"
import Image from "next/image"
import { useRouter } from "next/router"
import { FormattedMessage } from "react-intl"

import Button from "@components/Button"
import Container from "@components/Container"

import { useCompany } from "@hooks/api/useCompanies"

import { getTechnologyFamilyByValue } from "@utils/getTechnologies"

import TickCircleIcon from "@public/icons/tick-circle.svg"

const NAVIGATION_ITEMS = [
  { label: "Overview", href: "/" },
  { label: "Latest News", href: "/latest-news" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Similar Companies", href: "/similar-companies" },
  { label: "Related Companies", href: "/related-companies" },
]

const CompanyLayout: React.FC<any> = ({
  query,

  children,
}) => {
  const router = useRouter()

  const { data: { data: companyData } = {} } = useCompany(
    query.companyId as string,
  )

  const {
    icon_url,
    name,
    reviewed_on,
    type,
    description,
    technology_families,
  } = companyData || {}

  return (
    <div className="pb-4">
      <Container className="sm:mt-4 px-0">
        <div className="w-full bg-white sm:rounded-lg drop-shadow-md">
          {/* Company Quick Overview - Start */}
          <div className="flex pt-4 sm:pt-5 pb-5 sm:pb-6 px-4 sm:px-5 space-x-9">
            {/* Company Profile Info - Start */}
            <div
              className={cx("flex flex-1", {
                "space-x-4 sm:space-x-8": !!icon_url,
              })}
            >
              {icon_url && (
                <div className="relative w-[73px] h-[73px] sm:w-[120px] sm:h-[120px]">
                  <Image src={icon_url} alt="Company logo" layout="fill" />
                </div>
              )}

              <div className="flex-1 space-y-3">
                <h1 className="text-blue-900 sm:text-blue-1000 text-xl sm:text-2xl font-medium">
                  {name}
                  {!!reviewed_on && (
                    <TickCircleIcon className="w-5 h-5 fill-green-600 [&_circle]:fill-blue-900 inline-block ml-2" />
                  )}
                </h1>

                {type && (
                  <p className="uppercase text-blue-600 text-sm font-normal tracking-[0.17px]">
                    {type.join(", ")}
                  </p>
                )}

                {description && (
                  <p className="pb-0.5 sm:pb-0 text-blue-600 text-sm font-normal tracking-[0.17px] leading-5">
                    {description.substring(0, 112)}
                  </p>
                )}

                <Button variant="outline" colourScheme="white" isDisabled>
                  Sign up to add to list
                </Button>
              </div>
            </div>
            {/* Company Profile Info - End */}

            {/* Company Technologies - Start */}
            <div className="flex-1 hidden md:block">
              {Array.isArray(technology_families) &&
                technology_families.length > 0 && (
                  <>
                    <p className="text-blue-600 text-sm font-medium tracking-[0.16px]">
                      Technologies
                    </p>

                    <div className="mt-3 -mb-2">
                      {technology_families
                        .map(getTechnologyFamilyByValue)
                        .filter(Boolean)
                        .map((t) => (
                          <Button
                            key={`company-overview_technology-${t!.label.id}`}
                            shape="pill"
                            variant="outline"
                            colourScheme="white"
                            className="mr-2 last-of-type:mr-0 mb-2"
                            isDisabled
                            noDisabledStyles
                          >
                            <FormattedMessage {...t?.label} />
                          </Button>
                        ))}
                    </div>
                  </>
                )}
            </div>
            {/* Company Technologies - End */}
          </div>
          {/* Company Quick Overview - End */}

          {/* Tab Navigation - Start */}
          <div className="flex border-t border-blue-300 overflow-y-auto px-5">
            {NAVIGATION_ITEMS.map((navigationItem) => {
              const isActive =
                navigationItem.href === "/"
                  ? router.pathname.endsWith("[companyId]")
                  : router.asPath.endsWith(navigationItem.href)

              return (
                <Button
                  key={`company-overview_tab-navigation_item-${navigationItem.label}`}
                  variant="tab"
                  className={cx({
                    "bg-blue-100 !text-blue-900": isActive,
                    "!border-transparent": !isActive,
                  })}
                  onClick={() => {
                    if (navigationItem.href === "/") {
                      router.push({
                        pathname: router.pathname.replace(
                          /\[companyId\].*/,
                          "[companyId]",
                        ),
                        query,
                      })
                    } else {
                      if (!router.asPath.endsWith(navigationItem.href)) {
                        router.push({
                          pathname: router.pathname.replace(
                            /\[companyId\].*/,
                            `[companyId]/${navigationItem.href}`,
                          ),
                          query,
                        })
                      }
                    }
                  }}
                >
                  {navigationItem.label}
                </Button>
              )
            })}
          </div>
          {/* Tab Navigation - End */}
        </div>
      </Container>

      <Container className="mt-4 sm:mt-6">{children}</Container>
    </div>
  )
}

export default CompanyLayout
