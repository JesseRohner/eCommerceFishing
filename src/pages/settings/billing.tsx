import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import cx from "classnames"
import type { NextPage } from "next"
import Link from "next/link"

import UserSettingsLayout from "@layouts/UserSettings"

import Alert from "@components/Alert"
import Button from "@components/Button"
import Table from "@components/Table"

import useAuth from "@services/Auth/Auth.context"

import useRouterTabs from "@hooks/useRouterTabs"

import withAuth from "@utils/withAuth"

import DownloadIcon from "@public/icons/download.svg"

export type InvoiceRecord = {
  id: number
  issue: string
  card?: string
  description?: string
  price?: number
  status?: "Paid" | "UnPaid"
  download?: string
}

const data: Array<InvoiceRecord> = [
  {
    id: 1,
    issue: "Aug 1, 2022",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
  {
    id: 2,
    issue: "Aug 1, 2022",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
  {
    id: 3,
    issue: "Jan 1, 2021",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
  {
    id: 4,
    issue: "May 1, 2022",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
  {
    id: 5,
    issue: "Apr 1, 2022",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
  {
    id: 6,
    issue: "Feb 1, 2022",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
  {
    id: 7,
    issue: "Dec 1, 2022",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
  {
    id: 8,
    issue: "Nov 1, 2022",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
  {
    id: 9,
    issue: "Oct 1, 2022",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
  {
    id: 10,
    issue: "Aug 1, 2022",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
  {
    id: 11,
    issue: "Aug 1, 2022",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
  {
    id: 12,
    issue: "Aug 1, 2022",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
  {
    id: 13,
    issue: "Dec 1, 2022",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
  {
    id: 14,
    issue: "May 1, 2022",
    card: "****7296",
    description: "Monthly renewal",
    price: 299.0,
    status: "Paid",
    download: "Download PDF",
  },
]

const columnHelper = createColumnHelper<InvoiceRecord>()

const columns: ColumnDef<InvoiceRecord, any>[] = [
  columnHelper.accessor("issue", {
    size: 245,
    cell: ({ getValue }) => (
      <strong className="font-medium text-blue-900">{getValue()}</strong>
    ),
  }),
  columnHelper.accessor("card", {
    id: "card_mobile_hidden",
  }),
  columnHelper.accessor("description", {
    id: "description_mobile_hidden",
  }),
  columnHelper.accessor("price", {
    cell: ({ getValue }) => getValue().toFixed(2),
  }),
  columnHelper.accessor("status", {
    id: "status_mobile_hidden",
  }),
  columnHelper.accessor("download", {
    header: () => null,
    size: 150,
    cell: ({ getValue }) => (
      <Link href="#">
        <a className="fill-purple-500 text-purple-500 underline hover:no-underline">
          <span className="hidden sm:block">{getValue()}</span>
          <DownloadIcon className="block sm:hidden w-4 h-4" />
        </a>
      </Link>
    ),
  }),
]

const BillSetting: NextPage = () => {
  const [tabList, currentTab, setCurrentTab] = useRouterTabs(
    ["Overview", "Invoices"],
    (queryParamKey, nextValue) =>
      `/settings/billing?${queryParamKey}=${nextValue}`,
  )
  const { isUserPremium: isUserPremiumFn } = useAuth()

  const isUserPremium = isUserPremiumFn()

  return (
    <UserSettingsLayout
      headingText={{
        id: "settings.navigation.billing",
        defaultMessage: "Billing",
      }}
    >
      <div>
        {tabList.map((v) => (
          <Button
            key={`settings-billing-tab-${v}`}
            variant="tab"
            className={cx({
              "bg-blue-100 !text-blue-900": currentTab === v,
              "!border-transparent": currentTab !== v,
            })}
            onClick={() => setCurrentTab(v)}
          >
            {v}
          </Button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-blue-300 absolute left-0 right-0" />

      <div className="mt-6 text-sm text-blue-600 [&_strong]:text-blue-900 [&_strong]:font-medium space-y-5 sm:space-y-6">
        {currentTab === tabList[0] && (
          <>
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 [&>div]:flex-1 [&>div>h6:first-of-type]:hidden sm:[&>div>h6:first-of-type]:block [&>div>h6]:mb-3 [&>div>h6]:tracking-[0.01em] [&_button]:mt-4">
              <div>
                <h6>Plan details</h6>

                <div className="border border-blue-300 rounded-lg p-5 pt-3 space-y-2">
                  <h5 className="text-[#070B14] font-medium tracking-[0.17px]">
                    {isUserPremium ? "Premium" : "Free"}
                  </h5>

                  <h3 className="text-[#070B14] font-normal text-[32px] leading-[40px]">
                    ${isUserPremium ? 299 : 0}
                    <span className="text-blue-600 text-sm">/mo</span>
                  </h3>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

                  <Button
                    variant="outline"
                    colourScheme="white"
                    className="!mt-4"
                    isDisabled
                  >
                    Plan Details
                  </Button>
                </div>
              </div>

              <div>
                <h6>Billing information</h6>

                <Alert type="info" hideIcon>
                  {isUserPremium ? (
                    <>
                      Future charges will be billed to the card{" "}
                      <strong>****7296</strong>.
                    </>
                  ) : (
                    "Upgrade to Premium to view your billing information."
                  )}
                </Alert>

                {isUserPremium && (
                  <Button variant="outline" colourScheme="white" isDisabled>
                    Change Payment Method
                  </Button>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-blue-300" />

            <Button
              {...(isUserPremium && {
                variant: "outline",
                colourScheme: "white",
              })}
              isDisabled
            >
              {isUserPremium ? "Cancel Subscribtion" : "Upgrade to Premium"}
            </Button>
          </>
        )}
        {currentTab === tabList[1] && (
          <>
            {isUserPremium ? (
              <Table
                variant="billing"
                data={data}
                columns={columns}
                options={{ size: "lg", hasFirstColDivider: false }}
              />
            ) : (
              <Alert
                type="info"
                className="justify-center text-blue-700"
                hideIcon
              >
                Upgrade to Premium to view your invoices.
              </Alert>
            )}
          </>
        )}
      </div>
    </UserSettingsLayout>
  )
}

export default withAuth(BillSetting)
