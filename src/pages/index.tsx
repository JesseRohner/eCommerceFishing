import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { differenceInMonths } from "date-fns"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { FormattedMessage } from "react-intl"
import { dehydrate, QueryClient } from "react-query"

import Button from "@components/Button"
import Card from "@components/Card"
import Container from "@components/Container"
import HomeStatDisplay from "@components/HomeStatDisplay"
import Pill from "@components/Pill"
import Table from "@components/Table"
import TableCompanyReputation from "@components/TableCompanyReputation"
import Tag from "@components/Tag"

import SignUpToAccess from "@disclaimers/SignUpToAccess"

import InviteUsersModal from "@modals/InviteUsers"

import useAuth from "@services/Auth/Auth.context"
import { show } from "@services/ModalManager"

import {
  CompanyRecord,
  fetchCompanies,
  filterUnacceptedQueryParams,
  QUERY_KEY as COMPANIES_ENDPOINT_KEY,
  useCompanies,
} from "@hooks/api/useCompanies"
import {
  fetchLiveProjects,
  QUERY_KEY as LIVE_PROJECTS_QUERY_KEY,
  useLiveProjects,
} from "@hooks/api/useLiveProjects"
import { ProjectRecord } from "@hooks/api/useProject"

import { getTechnologyByValue } from "@utils/getTechnologies"
import { capitalForTable } from "@utils/numberFormatting"

import InviteIcon from "@public/icons/invite.svg"
import LockIcon from "@public/icons/lock.svg"

const sharedPaginationQuery = {
  "p.page": "1",
  "p.size": "30",
}

const companiesBaseQueryParams = {
  ...sharedPaginationQuery,
  "o.order": "DESC",
  "o.sort": "reputation",
}

const topInvestorsQueryParams = {
  ...companiesBaseQueryParams,
  "f.type": "Investor",
}

const topDevelopersQueryParams = {
  ...companiesBaseQueryParams,
  "f.type": "Developer",
}

const topProjectsQueryParams = {
  ...sharedPaginationQuery,
}

const liveProjectsColumnHelper = createColumnHelper<ProjectRecord>()
const companiesColumnHelper = createColumnHelper<CompanyRecord>()

const topProjectsColumns: ColumnDef<ProjectRecord, any>[] = [
  liveProjectsColumnHelper.accessor("publicid", {}),
  liveProjectsColumnHelper.accessor("featured", {}),
  liveProjectsColumnHelper.accessor("created_on", {}),
  liveProjectsColumnHelper.accessor("title", {
    size: 232,
    cell: ({ getValue, row }) => (
      <div className="space-y-0.5">
        <>
          <div className="absolute -top-px leading-3 space-x-1">
            <>
              {row.getValue("featured") && <Tag value="Featured" />}
              {row.getValue("created_on") &&
                differenceInMonths(
                  new Date(row.getValue("created_on")),
                  new Date(),
                ) === 0 && <Tag value="New" colourScheme="green" />}
            </>
          </div>

          <strong className="text-sm text-blue-900 leading-4 tracking-[0.16px] font-medium">
            {getValue()}
          </strong>

          {row.getValue("details") && (
            <p className="text-xs text-blue-600">
              {((row.getValue("details") as string) || "").substring(0, 35)}...
            </p>
          )}
        </>
      </div>
    ),
  }),
  liveProjectsColumnHelper.accessor("details", {}),
  liveProjectsColumnHelper.accessor("technology", {
    cell: ({ getValue }) => {
      const cellValue = getValue()

      if (!cellValue) {
        return "-"
      }

      const matchingTechnology = getTechnologyByValue(cellValue)

      if (!matchingTechnology) {
        return "-"
      }

      return (
        <Pill>
          <FormattedMessage {...matchingTechnology.label} />
        </Pill>
      )
    },
  }),
  liveProjectsColumnHelper.accessor("country", {}),
  liveProjectsColumnHelper.accessor("capital", {
    cell: ({ getValue }) =>
      getValue() ? (
        <>
          <p className="text-blue-900 font-medium text-sm leading-4 tracking-[0.15px] -mb-1">
            ${capitalForTable(getValue())}
          </p>
          <sub className="text-xs leading-4 tracking-[0.8px]">USD</sub>
        </>
      ) : (
        "-"
      ),
  }),
  liveProjectsColumnHelper.accessor("projectstage", {}),
  liveProjectsColumnHelper.accessor("capitaltype", {
    cell: ({ getValue }) => getValue()?.join(", "),
  }),
]
const companiesColumns: ColumnDef<CompanyRecord, any>[] = [
  companiesColumnHelper.accessor("id", {}),
  companiesColumnHelper.accessor("reputation", {
    size: 90,
    cell: ({ getValue, row }) => (
      <div>
        <TableCompanyReputation index={row.index + 1} value={getValue()} />
      </div>
    ),
  }),
  companiesColumnHelper.accessor("name", {
    size: 224,
    cell: ({ getValue, row }) => (
      <span className="font-medium text-blue-900">{getValue()}</span>
    ),
  }),
]

const Home: NextPage = () => {
  const router = useRouter()
  const { user, isAuthValid: isAuthValidFn } = useAuth()
  const {
    data: { data: { list: topInvestorsList = [] } = {} } = {},
    isLoading: topInvestorsListIsLoading,
  } = useCompanies(topInvestorsQueryParams)
  const {
    data: { data: { list: topDevelopersList = [] } = {} } = {},
    isLoading: topDevelopersListIsLoading,
  } = useCompanies(topDevelopersQueryParams)
  const {
    data: { data: { list: topProjectsList = [] } = {} } = {},
    isLoading: topProjectsListIsLoading,
  } = useLiveProjects(topProjectsQueryParams)

  const liveProjectsColumnVisibility: {
    [k in keyof ProjectRecord]?: boolean
  } = {
    publicid: false,
    featured: false,
    created_on: false,
    details: false,
  }
  const companiesColumnVisibility: { [k in keyof CompanyRecord]?: boolean } = {
    id: false,
  }

  const isAuthValid = isAuthValidFn()

  return (
    <>
      <Container className="mt-4 sm:mt-6">
        <div className="justify-between flex flex-col sm:flex-row">
          <h1 className="text-xl font-medium sm:text-[26px] tracking-[0.16px] text-[#070B14] leading-10">
            {isAuthValid
              ? `Welcome back, ${user.firstname} ${user.lastname}`
              : "Welcome to PF Nexus"}
          </h1>

          <div className="space-x-2 sm:space-x-4">
            <Button
              leftIcon={
                isAuthValid ? (
                  <InviteIcon className="w-6 h-6" />
                ) : (
                  <LockIcon className="w-6 h-6" />
                )
              }
              colourScheme="white"
              onClick={() => {
                // @ts-ignore
                show(InviteUsersModal)
              }}
              isDisabled={!isAuthValid}
            >
              Invite <span className="hidden sm:inline-block">colleagues</span>
            </Button>

            <Button
              // leftIcon={<PlusIcon className="w-6 h-6" />}
              leftIcon={<LockIcon className="w-6 h-6" />}
              colourScheme="teal"
              isDisabled
            >
              New Project
            </Button>
          </div>
        </div>
      </Container>

      <Container className="mt-4 sm:mt-6">
        <div className="flex flex-col justify-between sm:flex-row mx-0 sm:mx-[-12px]">
          <div className="px-0 mb-6 sm:mb-0 sm:basis-3/4 sm:px-3">
            <div className="grid grid-cols-1 gap-3 mb-6 sm:gap-6 sm:grid-cols-3">
              <HomeStatDisplay
                label="Total project Value Listed"
                value="$1,089.0m"
                tooltipContent="The combined value of all projects looking for capital on PF Nexus"
                colourScheme="dark-blue"
              />
              <HomeStatDisplay
                label="Project generation capacity"
                value="12.17GW"
                tooltipContent="The combined forecast power generation capacity of all live projects on PF Nexus"
                colourScheme="green"
              />
              <HomeStatDisplay
                label="Trading Companies"
                value="4,023"
                tooltipContent="The combined number of companies in the PF Nexus database"
                colourScheme="gray"
              />
            </div>

            <div className="h-[516px] sm:h-[calc(100vh-250px)]">
              <Card
                size="md"
                headingText="Top projects"
                showMoreURL="/database/live-projects"
                className="overflow-hidden"
              >
                {isAuthValid ? (
                  <Table
                    data={topProjectsList}
                    dataIsLoading={topProjectsListIsLoading}
                    columns={topProjectsColumns}
                    columnVisibility={liveProjectsColumnVisibility}
                    onRowClick={(row) => {
                      const projectId = row.getValue("publicid")

                      if (projectId) {
                        router.push(`/project/${projectId}`)
                      }
                    }}
                    options={{
                      hasHead: false,
                      hasFirstColDivider: false,
                      size: "lg",
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-white rounded-lg">
                    <SignUpToAccess />
                  </div>
                )}
              </Card>
            </div>
          </div>

          <div className="sm:basis-1/4 h-[648px] sm:h-[calc(100vh-120px)] px-0 sm:px-3">
            <div className="pb-3 h-[50%]">
              <Card
                size="sm"
                headingText="Top investors"
                showMoreURL="/database/investors?o.order=ASC&o.sort=reputation&f.type=Investor"
                className="overflow-hidden"
              >
                {isAuthValid ? (
                  <Table
                    data={topInvestorsList}
                    dataIsLoading={topInvestorsListIsLoading}
                    columns={companiesColumns}
                    columnVisibility={companiesColumnVisibility}
                    onRowClick={(row) => {
                      const companyId = row.getValue("id")

                      if (companyId) {
                        router.push(`/company/${companyId}`)
                      }
                    }}
                    options={{ hasHead: false, hasFirstColDivider: false }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-white rounded-lg">
                    <LockIcon className="w-10 h-10 mx-auto fill-blue-500" />
                  </div>
                )}
              </Card>
            </div>

            <div className="pt-3 h-[50%]">
              <Card
                size="sm"
                headingText="Top developers"
                showMoreURL="/database/developers?o.order=ASC&o.sort=reputation&f.type=Developer"
                className="overflow-hidden"
              >
                {isAuthValid ? (
                  <Table
                    data={topDevelopersList}
                    dataIsLoading={topDevelopersListIsLoading}
                    columns={companiesColumns}
                    columnVisibility={companiesColumnVisibility}
                    onRowClick={(row) => {
                      const companyId = row.getValue("id")

                      if (companyId) {
                        router.push(`/company/${companyId}`)
                      }
                    }}
                    options={{ hasHead: false, hasFirstColDivider: false }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-white rounded-lg">
                    <LockIcon className="w-10 h-10 mx-auto fill-blue-500" />
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(
    [
      COMPANIES_ENDPOINT_KEY,
      filterUnacceptedQueryParams(topInvestorsQueryParams),
    ],
    () => fetchCompanies(topInvestorsQueryParams),
  )

  await queryClient.prefetchQuery(
    [
      COMPANIES_ENDPOINT_KEY,
      filterUnacceptedQueryParams(topDevelopersQueryParams),
    ],
    () => fetchCompanies(topDevelopersQueryParams),
  )

  await queryClient.prefetchQuery(
    [LIVE_PROJECTS_QUERY_KEY, topProjectsQueryParams],
    () => fetchLiveProjects(topProjectsQueryParams),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
