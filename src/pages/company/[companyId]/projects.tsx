import { GetServerSidePropsContext } from "next"
import { dehydrate, QueryClient } from "react-query"

import {
  fetchCompany,
  QUERY_KEY as COMPANIES_ENDPOINT_KEY,
} from "@hooks/api/useCompanies"

import CompanyLayout from "@layouts/Company"

import ComingSoonDisclaimer from "@disclaimers/ComingSoon"

import { cardClassName } from "."

const CompanyProjects: React.FC<any> = ({ query }) => (
  <CompanyLayout query={query}>
    <div className={`${cardClassName} flex justify-center`}>
      <ComingSoonDisclaimer />
    </div>
  </CompanyLayout>
)

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

export default CompanyProjects
