import cx from "classnames"
import { GetServerSidePropsContext, NextPage } from "next"
import Tooltip from "rc-tooltip"
import { FormattedMessage } from "react-intl"
import { dehydrate, QueryClient } from "react-query"
import { toast } from "react-toastify"

import Button from "@components/Button"
import Checkbox from "@components/Checkbox"
import Container from "@components/Container"
import CopyToClipboardButton from "@components/CopyToClipboardButton"
import InfoBox from "@components/InfoBox"
import Pill from "@components/Pill"

import InviteUsers from "@modals/InviteUsers"
import LoginModal from "@modals/Login"
import SendIntroduction from "@modals/SendIntroduction"
import ShareProject from "@modals/ShareProject"
import UpgradeToPremium from "@modals/UpgradeToPremium"

import {
  fetchProject,
  ProjectRecord,
  ProjectStatus,
  QUERY_KEY,
  useProject,
} from "@hooks/api/useProject"

import useAuth from "@services/Auth/Auth.context"
import { show } from "@services/ModalManager"

import { countryList } from "@utils/getCountries"
import { getTechnologyByValue } from "@utils/getTechnologies"
import { capitalForTable, formatThousands } from "@utils/numberFormatting"

import BookmarkIcon from "@public/icons/bookmark.svg"
import InfoIcon from "@public/icons/info.svg"
import LockIcon from "@public/icons/lock.svg"
import ShareIcon from "@public/icons/share.svg"

enum ARRANGED_DEBT_CATEGORIES {
  equityarranged = "Equity already arranged",
  equityraising = "Equity yet to be raised",
  debtarranged = "Debt already arranged",
  debtraising = "Debt yet to be raised",
}

const projectCardClassName =
  "bg-white rounded-lg shadow-md pt-6 relative overflow-hidden"

type IntroductionCardProps = {
  isProjectClosed?: boolean

  data?: ProjectRecord
}

const IntroductionCard: React.FC<IntroductionCardProps> = ({
  isProjectClosed,
  data,
}) => {
  const { isAuthValid: isAuthValidFn } = useAuth()

  const isPremium = false
  const nrOfIntros: number = 3

  const capitalType =
    Array.isArray(data?.capitaltype) && data?.capitaltype.length
  const userType = data?.usertype

  const isAuthValid = isAuthValidFn()

  let message
  let buttonIcon
  let buttonText = "Send Introduction"
  let buttonDisabled
  let buttonDisabledStyles

  if (isAuthValid) {
    if (isPremium) {
      message = ""
    } else {
      if (data?.projectstatus === ProjectStatus.Unapproved) {
        message = "Your account is waiting to be approved. Please check soon."
      } else if (data?.projectstatus === ProjectStatus.ContractPending) {
        message =
          "This project hasn’t been approved by our team yet. Pre-register Interest to be notified when the project is ready for introductions."
        buttonText = "Pre-register Interest"
      } else if (isProjectClosed) {
        message = "This project is no longer accepting introductions."
        buttonDisabled = true
        buttonDisabledStyles = true
      } else {
        message = (
          <>
            {nrOfIntros} Introductions left until 01/08/2022.{" "}
            <a
              className="cursor-pointer"
              onClick={() => {
                // @ts-ignore
                show(UpgradeToPremium)
              }}
            >
              Upgrade
            </a>
          </>
        )
      }
    }
  } else {
    message = (
      <>
        Log in to send introductions.{" "}
        <a
          className="cursor-pointer"
          onClick={() => {
            // @ts-ignore
            show(LoginModal)
          }}
        >
          Sign up
        </a>
      </>
    )
    buttonIcon = <LockIcon />
    buttonDisabled = true
  }

  if (nrOfIntros < 1) {
    buttonIcon = <LockIcon />
  }

  return (
    <div className={cx("px-7 pb-6 space-y-4", projectCardClassName)}>
      <h2>Interested? Introduce yourself.</h2>

      {/* Conditional Divider */}
      {(capitalType || userType) && <div className="w-full h-px bg-blue-300" />}

      {capitalType && (
        <p className="flex justify-between">
          <span>Project Is Seeking:</span>
          {/* Ignoring since `Array.isArray` will return `false` if value is undefined */}
          {/* @ts-ignore */}
          <span className="text-blue-900">{data.capitaltype.join(", ")}</span>
        </p>
      )}

      {/* Conditional Divider */}
      {(capitalType || userType) && <div className="w-full h-px bg-blue-300" />}

      {userType && (
        <p className="flex justify-between">
          <span>Project Owner Is:</span>
          <span className="text-blue-900">{userType}</span>
        </p>
      )}

      <Button
        colourScheme={isAuthValid && nrOfIntros === 0 ? "yellow" : "teal"}
        leftIcon={buttonIcon}
        className="w-full !mt-6"
        onClick={() => {
          // @ts-ignore
          show(SendIntroduction)
        }}
        isDisabled={buttonDisabled}
        noDisabledStyles={!buttonDisabledStyles}
      >
        {buttonText}
      </Button>

      {message && (
        <small className="block text-xs tracking-[0.17px] leading-5 !mt-3 [&_a]:underline [&_a]:hover:no-underline">
          {message}
        </small>
      )}

      <div className="w-full h-px bg-blue-300 absolute left-0 right-0" />
      <div className="w-full h-px" />

      <div className="space-y-3 sm:space-y-0 sm:space-x-3 !mt-5">
        <Button
          variant="outline"
          colourScheme="white"
          className="w-full sm:w-auto"
          leftIcon={<BookmarkIcon />}
          isDisabled
        >
          Add To List
        </Button>

        <div className="flex sm:inline-block space-x-3">
          <Button
            variant="outline"
            colourScheme="white"
            className="flex-1"
            leftIcon={
              <ShareIcon className="fill-transparent stroke-blue-600" />
            }
            onClick={() => {
              // @ts-ignore
              show(ShareProject, {
                onShareClick: (
                  emailList: Array<string>,
                  closeSelf: Function,
                ) => {
                  closeSelf()

                  toast(
                    `Project shared with ${emailList.length} email address${
                      emailList.length > 1 ? "es" : ""
                    }`,
                  )
                },
              })
            }}
          >
            Share
          </Button>
          <CopyToClipboardButton />
        </div>
      </div>
    </div>
  )
}

const ProjectPage: NextPage<Pick<GetServerSidePropsContext, "query">> = ({
  query,
}) => {
  const { projectId } = query || {}
  const { isAuthValid } = useAuth()
  const { data: { data } = {} } = useProject(projectId as string)

  const isProjectClosed =
    data?.projectstatus &&
    [
      ProjectStatus.ContractDeclined,
      ProjectStatus.ClosedSuccess,
      ProjectStatus.ClosedElsewhere,
      ProjectStatus.ClosedAborted,
      ProjectStatus.NotSuitable,
    ].includes(data.projectstatus)

  return (
    <>
      {isProjectClosed && (
        <InfoBox colourScheme="red">This project has been closed</InfoBox>
      )}
      <Container
        className={cx(
          "flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-8",
          "mt-4 sm:mt-6 pb-6 sm:pb-8",
          "text-blue-600 text-sm leading-6 tracking-[0.17px]",
          "[&_h1]:text-blue-900 [&_h1]:text-2xl [&_h1]:leading-8 [&_h1]:font-medium",
          "[&_h2]:text-blue-900 [&_h2]:text-xl [&_h2]:leading-6 [&_h2]:font-medium",
          "[&_h3]:text-blue-900 [&_h3]:text-base [&_h3]:leading-5 [&_h3]:font-medium",
          "[&_h4]:text-blue-900 [&_h4]:text-base [&_h4]:leading-6 [&_h4]:font-normal",
          "[&_section]:flex [&_section]:flex-col [&_section]:sm:flex-row [&_section]:space-y-4 [&_section]:sm:space-y-0 [&_section]:sm:space-x-4 [&_section_div]:flex-1 [&_section_div_p]:mb-2",
        )}
      >
        <main
          className={cx(
            "flex-grow sm:min-w-[724px] text-blue-700 space-y-8",
            "px-8 pb-8",
            projectCardClassName,
          )}
        >
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-blue-600 text-xs tracking-[0.8px] leading-4 uppercase">
                Project Micro-Teaser
              </span>

              {data?.title && <h1>{data.title}</h1>}

              {data?.details && (
                <div className="[&_ul]:list-disc [&_ul]:ml-4">
                  {data.details}
                </div>
              )}
            </div>

            <section>
              <div>
                <p>Technology</p>
                {data?.technology != null &&
                getTechnologyByValue(data.technology) ? (
                  <>
                    <Pill size="md">
                      <FormattedMessage
                        {...getTechnologyByValue(data.technology)?.label}
                      />
                    </Pill>
                    <Tooltip
                      overlay={<span>Placeholder</span>}
                      placement="bottomLeft"
                      overlayClassName="pfn-tooltip"
                    >
                      <div className="inline">
                        <InfoIcon className="w-5 h-5 fill-blue-500 inline-block -mt-1 ml-1" />
                      </div>
                    </Tooltip>
                  </>
                ) : (
                  "-"
                )}
              </div>
              <div>
                <p>Country</p>
                {data?.country ? (
                  <h3>
                    {" "}
                    <FormattedMessage
                      {...countryList.find(
                        (country) => country.value === data.country,
                      )?.label}
                    />
                  </h3>
                ) : (
                  "-"
                )}
              </div>
              <div>
                <p>Build Stage</p>
                {data?.projectstage ? (
                  <h3>
                    {data.projectstage}
                    <Tooltip
                      overlay={<span>Placeholder</span>}
                      placement="bottomLeft"
                      overlayClassName="pfn-tooltip"
                    >
                      <div className="inline">
                        <InfoIcon className="w-5 h-5 fill-blue-500 inline-block -mt-1 ml-1" />
                      </div>
                    </Tooltip>
                  </h3>
                ) : (
                  "-"
                )}
              </div>
            </section>
          </div>

          <div className="w-full h-px bg-blue-300" />

          <section>
            <div>
              <p>Project is Seeking</p>
              {Array.isArray(data?.capitaltype) && data?.capitaltype.length ? (
                <h1>{data.capitaltype.join(", ")}</h1>
              ) : (
                "-"
              )}
            </div>
            <div>
              <p>Capital Required (USD Equiv.)</p>
              {data?.capital ? (
                <h1>${capitalForTable(data.capital, 0)}</h1>
              ) : (
                "-"
              )}
            </div>
            <div className="hidden sm:block"></div>
          </section>

          <div className="space-y-3">
            <Checkbox
              id="test"
              size="md"
              shape="circle"
              label="Financial Model available"
              checked={data?.financialmodel === "Yes"}
              hasNonCheckedIcon
              hasNoDisabledHoverStyles
              isReadonly
            />
            <Checkbox
              id="test"
              size="md"
              shape="circle"
              label="This project is open to being sold"
              checked={data?.sale === "Yes"}
              hasNonCheckedIcon
              hasNoDisabledHoverStyles
              isReadonly
            />
            <Checkbox
              id="test"
              size="md"
              shape="circle"
              label="This project is open to speaking with advisors"
              checked={data?.advisorintros === "Open"}
              hasNonCheckedIcon
              hasNoDisabledHoverStyles
              isReadonly
            />
          </div>

          {/* Conditional Divider */}
          {((data?.debt_arranged && !!Object.keys(data.debt_arranged).length) ||
            data?.debt_arranged) && (
            <>
              <div className="w-full h-px bg-blue-300" />

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                {data?.debt_arranged &&
                  !!Object.keys(data.debt_arranged).length && (
                    <div className="flex-1 text-[#070B14]">
                      <table
                        className={cx(
                          "border-separate border-spacing-0",
                          "w-full",
                          "[&_th]:px-3 [&_th]:py-[6px] [&_th]:border [&_th]:border-blue-300 [&_th]:text-left [&_th]:font-normal [&_th]:bg-blue-100",
                          "[&_th:last-of-type]:border-l-0",
                          "[&_th:first-of-type]:rounded-tl-[4px] [&_th:last-of-type]:rounded-tr-[4px]",
                          "[&_td]:px-3 [&_td]:py-[6px] [&_td]:border [&_td]:border-blue-300",
                          "[&_tbody_tr_td]:border-t-0 [&_tbody_tr_td:last-of-type]:border-l-0",
                          "[&_tbody_tr:last-of-type_td:first-of-type]:rounded-bl-[4px] [&_tbody_tr:last-of-type_td:last-of-type]:rounded-br-[4px]",
                        )}
                      >
                        <thead className="text-blue-600">
                          <tr className="group">
                            <th className="">Proposed Funding Structure</th>
                            <th>Equity</th>
                          </tr>
                        </thead>

                        <tbody>
                          {Object.keys(data.debt_arranged).map((k) => (
                            <tr key={k}>
                              <td>
                                {
                                  ARRANGED_DEBT_CATEGORIES[
                                    k as keyof typeof data.debt_arranged
                                  ]
                                }
                              </td>
                              <td>
                                {
                                  data.debt_arranged![
                                    k as keyof typeof data.debt_arranged
                                  ]
                                }
                                %
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                {data?.use_of_funds && (
                  <div className="flex-1">
                    <div className="border border-blue-300 rounded-[4px] h-full text-[#070B14]">
                      <div className="bg-blue-100 text-blue-600 px-3 py-[6px] border-b border-blue-300">
                        Use of Funds
                      </div>

                      <div className="px-3 py-[6px]">{data.use_of_funds}</div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Divider */}
          <div className="w-full h-px bg-blue-300" />

          {(data?.mwp_generation || data?.mwh_pa_production) && (
            <section>
              <div>
                <p>Generation Capacity</p>
                {data.mwp_generation && (
                  <h3>
                    {data?.mwp_generation}MWp
                    <Tooltip
                      overlay={<span>Placeholder</span>}
                      placement="bottomLeft"
                      overlayClassName="pfn-tooltip"
                    >
                      <div className="inline">
                        <InfoIcon className="w-5 h-5 fill-blue-500 inline-block -mt-1 ml-1" />
                      </div>
                    </Tooltip>
                  </h3>
                )}
              </div>
              <div>
                <p>Annual Electricity Production</p>
                {data.mwh_pa_production && (
                  <h3>
                    {formatThousands(data.mwh_pa_production)} MWh/pa
                    <Tooltip
                      overlay={<span>Placeholder</span>}
                      placement="bottomLeft"
                      overlayClassName="pfn-tooltip"
                    >
                      <div className="inline">
                        <InfoIcon className="w-5 h-5 fill-blue-500 inline-block -mt-1 ml-1" />
                      </div>
                    </Tooltip>
                  </h3>
                )}
              </div>
              <div className="hidden sm:block"></div>
            </section>
          )}

          <Checkbox
            id="test"
            size="md"
            shape="circle"
            label="Open to Investor choosing EPC"
            checked={data?.investor_epc === "Yes"}
            hasNonCheckedIcon
            hasNoDisabledHoverStyles
            isReadonly
          />

          <div className="bg-blue-100 rounded-lg p-5 pt-4 space-y-8">
            <section>
              <div>
                <p>PPA Offtake Status</p>
                {data?.offtake ? <h3>{data.offtake}</h3> : "-"}
              </div>
              <div>
                <p>PPA Type</p>
                {data?.ppa_take_pay ? (
                  <h3>
                    Take-Or-Pay
                    <Tooltip
                      overlay={<span>Placeholder</span>}
                      placement="bottomLeft"
                      overlayClassName="pfn-tooltip"
                    >
                      <div className="inline">
                        <InfoIcon className="w-5 h-5 fill-blue-500 inline-block -mt-1 ml-1" />
                      </div>
                    </Tooltip>
                  </h3>
                ) : (
                  "-"
                )}
              </div>
              <div className="hidden sm:block"></div>
            </section>

            <section>
              <div>
                <p>MWh Sold Under PPA</p>
                {data?.mwh_pa_selling ? (
                  <h3>
                    {formatThousands(data.mwh_pa_selling)} MWh/pa
                    <Tooltip
                      overlay={<span>Placeholder</span>}
                      placement="bottomLeft"
                      overlayClassName="pfn-tooltip"
                    >
                      <div className="inline">
                        <InfoIcon className="w-5 h-5 fill-blue-500 inline-block -mt-1 ml-1" />
                      </div>
                    </Tooltip>
                  </h3>
                ) : (
                  "-"
                )}
              </div>
              <div>
                <p>PPA Tariff (USD/kWh Equiv)</p>
                {data?.ppa_tariff ? (
                  <h3>
                    ${data.ppa_tariff}/kWh
                    <Tooltip
                      overlay={<span>Placeholder</span>}
                      placement="bottomLeft"
                      overlayClassName="pfn-tooltip"
                    >
                      <div className="inline">
                        <InfoIcon className="w-5 h-5 fill-blue-500 inline-block -mt-1 ml-1" />
                      </div>
                    </Tooltip>
                  </h3>
                ) : (
                  "-"
                )}
              </div>
              <div>
                <p>PPA Length</p>
                {data?.ppa_length ? (
                  <h3>
                    {data.ppa_length}
                    {data.ppa_length === 1 ? "year" : "years"}
                  </h3>
                ) : (
                  "-"
                )}
              </div>
            </section>

            <section>
              <div>
                <p>PPA Offtaker Party</p>
                {data?.offtake_party ? <h3>{data.offtake_party}</h3> : "-"}
              </div>
              <div className="hidden sm:block"></div>
              <div className="hidden sm:block"></div>
            </section>
          </div>
        </main>

        <aside className="flex-shrink-0 space-y-5 sm:space-y-8 sm:w-[400px]">
          <div className={cx("px-7 pb-6", projectCardClassName)}>
            <div className="space-y-[14px]">
              <Checkbox
                id="test"
                size="md-2"
                shape="circle"
                label="Submitted By Project Owner"
                helperText="19/07/2022"
                checked
                displayTimelineConnector
                timelineConnectorClassName="h-[calc(100%+6px)]"
                isReadonly
                hasNoDisabledHoverStyles
              />
              <Checkbox
                id="test"
                size="md-2"
                shape="circle"
                label="Approved by PF Nexus"
                helperText="22/07/2022"
                checked
                displayTimelineConnector
                timelineConnectorClassName="h-[calc(100%+2px)]"
                isReadonly
                hasNoDisabledHoverStyles
              />
              <Checkbox
                id="test"
                size="md-2"
                shape="circle"
                label="Accepting introductions"
                className="[&_div]:border-green-500"
                displayTimelineConnector
                timelineConnectorClassName="bg-blue-300 h-[calc(100%+2px)]"
                isReadonly
                hasNoDisabledHoverStyles
              />
              <Checkbox
                id="test"
                size="md-2"
                shape="circle"
                label="Contract Signed"
                className="[&_div]:border-blue-300"
                isReadonly
                hasNoDisabledHoverStyles
              />
            </div>
          </div>

          <IntroductionCard data={data} isProjectClosed={isProjectClosed} />

          <div className={cx("px-7 pb-6 space-y-4", projectCardClassName)}>
            <h4>Invite your team to PF Nexus</h4>

            <p className="!mt-2">
              Share projects and company information seamlessly by inviting your
              colleagues to join PF Nexus.
            </p>

            <Button
              variant="outline"
              colourScheme="white"
              className="w-full"
              leftIcon={!isAuthValid() ? <LockIcon className="" /> : undefined}
              isDisabled={!isAuthValid()}
              onClick={() => {
                // @ts-ignore
                show(InviteUsers)
              }}
            >
              Invite Colleagues
            </Button>
          </div>

          {/* <div className={cx("pt-0 pb-6 space-y-4", projectCardClassName)}>
            <div className="w-full text-center uppercase bg-blue-300 text-sm leading-4 tracking-[4%] py-2">
              Only visible to you
            </div>

            <div className="px-7 space-y-2">
              <h2 className="mb-4">Introductions</h2>

              <div className="flex space-x-3 p-3 bg-white border border-blue-300 rounded-lg">
                <div className="flex-shrink-0">
                  <Avatar value="SG" />
                </div>

                <div className="flex-grow">
                  <p className="w-full flex justify-between items-start">
                    <h3 className="!font-normal">Scott Gillam</h3>
                    <span className="leading-5">1 day ago</span>
                  </p>
                  <p className="leading-5">Fund Manager, Solar Centric</p>
                </div>
              </div>

              <div className="flex space-x-3 p-3 bg-white border border-blue-300 rounded-lg">
                <div className="flex-shrink-0">
                  <Avatar value="SG" />
                </div>

                <div className="flex-grow">
                  <p className="w-full flex justify-between items-start">
                    <h3 className="!font-normal">Scott Gillam</h3>
                    <span className="leading-5">1 day ago</span>
                  </p>
                  <p className="leading-5">Fund Manager, Solar Centric</p>
                </div>
              </div>

              <div className="flex space-x-3 p-3 bg-white border border-blue-300 rounded-lg">
                <div className="flex-shrink-0">
                  <Avatar value="SG" />
                </div>

                <div className="flex-grow">
                  <p className="w-full flex justify-between items-start">
                    <h3 className="!font-normal">Scott Gillam</h3>
                    <span className="leading-5">1 day ago</span>
                  </p>
                  <p className="leading-5">Fund Manager, Solar Centric</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* <Button colourScheme="white">Edit Project</Button> */}
        </aside>
      </Container>
    </>
  )
}

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const queryClient = new QueryClient()

  const { projectId } = query

  if (!projectId) {
    return { props: { query } }
  }

  await queryClient.prefetchQuery([QUERY_KEY, projectId], () =>
    fetchProject(projectId as string),
  )

  return {
    props: {
      query,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default ProjectPage
