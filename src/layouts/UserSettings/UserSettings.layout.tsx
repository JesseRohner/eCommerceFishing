import cx from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import { FormattedMessage, MessageDescriptor } from "react-intl"

import UserCard from "@components/UserCard"

import NotificationIcon from "@public/icons/bell.svg"
import EditIcon from "@public/icons/edit.svg"
import InvoiceIcon from "@public/icons/invoice.svg"

type RouteType = {
  title: MessageDescriptor
  route: string
  icon: React.ReactElement
}

const ROUTES: Array<RouteType> = [
  {
    title: {
      id: "settings.navigation.edit_profile",
      defaultMessage: "Edit profile",
    },
    route: "/settings/edit-profile",
    icon: <EditIcon className="w-6 fill-blue-600" />,
  },
  {
    title: {
      id: "settings.navigation.notifications",
      defaultMessage: "Notifications",
    },
    route: "/settings/notifications",
    icon: <NotificationIcon className="w-6 fill-blue-600" />,
  },
  {
    title: {
      id: "settings.navigation.billing",
      defaultMessage: "Billing",
    },
    route: "/settings/billing",
    icon: <InvoiceIcon className="w-6 fill-blue-600" />,
  },
]

type UserSettingsProps = {
  headingText: MessageDescriptor
  children: React.ReactNode
}

const UserSettings: React.FC<UserSettingsProps> = ({
  headingText,
  children,
}) => {
  const { pathname } = useRouter()

  return (
    <div className="flex px-4 sm:px-8 sm:gap-x-8 [&>div]:py-4 sm:[&>div]:py-6">
      <div className="hidden lg:flex h-screen sticky top-0">
        <div className="min-w-[280px] bg-white rounded-lg shadow-[0px_2px_4px_rgba(0,0,0,0.12)]">
          <UserCard
            colourScheme="white"
            variant="compact-2"
            isRounded
            disableHover
          />

          <div>
            <ul>
              {ROUTES.map((route) => (
                <li
                  key={route.route}
                  className={cx(
                    "px-4 py-2 text-sm font-medium leading-6 hover:bg-blue-100 text-blue-600 first-of-type:border-t border-b border-blue-300",
                    {
                      "bg-blue-100 border-r-[3px] border-r-green-500":
                        pathname === route.route,
                    },
                  )}
                >
                  <Link href={route.route}>
                    <a className="flex items-center">
                      {route.icon}
                      <p className="ml-3 leading-6">
                        <FormattedMessage {...route.title} />
                      </p>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-screen">
        <div className="bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.12)] rounded-lg px-6 sm:px-8 py-5 sm:py-6 w-full h-full relative">
          <h1 className="mb-4 text-lg sm:text-xl font-medium text-blue-900">
            <FormattedMessage {...headingText} />
          </h1>
          {children}
        </div>
      </div>
    </div>
  )
}

export default UserSettings
