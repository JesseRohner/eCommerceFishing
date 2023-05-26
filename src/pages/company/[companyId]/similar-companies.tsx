import cx from "classnames"
import { GetServerSidePropsContext } from "next"
import { dehydrate, QueryClient } from "react-query"

import CompanyLayout from "@layouts/Company"

import Button from "@components/Button"
import CompanyInfoDisplay from "@components/CompanyInfoDisplay"

import ComingSoonDisclaimer from "@disclaimers/ComingSoon"

import {
  fetchCompany,
  QUERY_KEY as COMPANIES_ENDPOINT_KEY,
} from "@hooks/api/useCompanies"

import { __PROD__ } from "@utils/env"

import CompanyProfileImage from "@public/profile.png"

import { cardClassName } from "."

const CompanySimilarCompanies: React.FC<any> = ({ query }) => {
  const icon_url = CompanyProfileImage

  return (
    <CompanyLayout query={query}>
      <div
        className={cx(cardClassName, {
          "!p-0 divide-y divide-blue-300 overflow-hidden": !__PROD__,
          "flex justify-center": __PROD__,
        })}
      >
        {!__PROD__ ? (
          [...new Array(10).fill(undefined)].map((_, idx) => (
            <CompanyInfoDisplay
              key={idx}
              variant="company-info"
              imageUrl={icon_url}
              heading="Acciona Energía"
              subHeading="DEVELOPER"
              companyProfileId="random-id"
            >
              Leading the change toward a decarbonized energy model.
              #NewEnergyforABetterPlanet
              <div className="hidden sm:block mt-3 space-x-1.5">
                {[
                  "Solar",
                  "Wind",
                  "Other renewables",
                  "Non-renewable",
                  "Infrastructure",
                ].map((technology) => (
                  <Button
                    key={technology}
                    variant="outline"
                    shape="pill"
                    colourScheme="white"
                    isDisabled
                    noDisabledStyles
                  >
                    {technology}
                  </Button>
                ))}
              </div>
            </CompanyInfoDisplay>
          ))
        ) : (
          <ComingSoonDisclaimer />
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

export default CompanySimilarCompanies
