import type { NextPage } from "next"
import { useState } from "react"
import { FormattedMessage, MessageDescriptor, useIntl } from "react-intl"
import { toast } from "react-toastify"

import Alert from "@components/Alert"
import ExternalLink from "@components/ExternalLink"
import Switch from "@components/Switch"

import UserSettingsLayout from "@layouts/UserSettings"

import useAuth from "@services/Auth"

import { useUserUpdate } from "@hooks/api/useUser"
import { UserNotificationType } from "@hooks/api/useUserAccess"

import withAuth from "@utils/withAuth"

type NotificationPreferenceType = {
  id: UserNotificationType
  checked?: boolean
  label: MessageDescriptor
  description: MessageDescriptor
}

const notificationSwitchItemList: Array<NotificationPreferenceType> = [
  {
    id: UserNotificationType.Reminders,
    label: {
      id: "settings.notifications.item.automated_reminders.label",
      defaultMessage: "Automated reminders",
    },
    description: {
      id: "settings.notifications.item.automated_reminders.description",
      defaultMessage:
        "In platform tips that help you get the most out of your experience",
    },
  },
  {
    id: UserNotificationType.Matches,
    label: {
      id: "settings.notifications.item.project_alert.label",
      defaultMessage: "Project alert emails",
    },
    description: {
      id: "settings.notifications.item.project_alert.description",
      defaultMessage: "Emails about new projects matching your alert criteria",
    },
  },
  {
    id: UserNotificationType.Product,
    label: {
      id: "settings.notifications.item.product_updates.label",
      defaultMessage: "Product updates",
    },
    description: {
      id: "settings.notifications.item.product_updates.description",
      defaultMessage:
        "Emails about new product features and improvements released by the PF Nexus team",
    },
  },
  {
    id: UserNotificationType.Community,
    label: {
      id: "settings.notifications.item.community_updates.label",
      defaultMessage: "Community updates",
    },
    description: {
      id: "settings.notifications.item.community_updates.description",
      defaultMessage:
        "Emails about community updates, including marketing emails",
    },
  },
]

const Notification: NextPage = () => {
  const intl = useIntl()
  const { user } = useAuth()
  const [selectedNotifications, setSelectedNotifications] = useState<
    Array<UserNotificationType>
  >(user.notificationpreferences || [])
  const { mutate } = useUserUpdate()

  const handleSwitchChange = (notificationId: UserNotificationType) => {
    if (!user.id) {
      return
    }

    let nextSelectedNotifications: Array<UserNotificationType>

    if (selectedNotifications.includes(notificationId)) {
      nextSelectedNotifications = [
        ...selectedNotifications.filter(
          (selectedNotificationId) => selectedNotificationId !== notificationId,
        ),
      ]
    } else {
      nextSelectedNotifications = [...selectedNotifications, notificationId]
    }

    setSelectedNotifications(nextSelectedNotifications)

    mutate(
      {
        id: user.id,
        notificationpreferences: nextSelectedNotifications,
      },
      {
        onSuccess: () => {
          toast("Notification settings updated")
        },
        onError: () => {
          toast(
            "There has been an error while updating your settings. Your changes have not been saved",
          )
        },
      },
    )
  }

  return (
    <UserSettingsLayout
      headingText={{
        id: "settings.navigation.notifications",
        defaultMessage: "Notifications",
      }}
    >
      <div className="flex flex-col gap-6">
        <Alert type="info" hideIcon={false} iconPosition="center">
          <FormattedMessage
            id="settings.notifications.alert.link.description"
            defaultMessage="For more help with notifications,"
          />{" "}
          <ExternalLink
            href="https://help.pfnexus.com/en/articles/5415210-pf-nexus-email-notifications"
            colourScheme="purple-500"
            isDefaultIconHidden
          >
            <FormattedMessage
              id="settings.notifications.alert.link.title"
              defaultMessage="Check out our Help centre article"
            />
          </ExternalLink>
        </Alert>

        <div className="flex flex-col gap-[18px]">
          {notificationSwitchItemList.map(({ id, label, description }) => (
            <Switch
              key={id}
              checked={selectedNotifications.includes(id)}
              onClick={() => handleSwitchChange(id)}
              label={intl.formatMessage(label)}
              description={intl.formatMessage(description)}
              className="ml-2"
            />
          ))}
        </div>
      </div>
    </UserSettingsLayout>
  )
}

export default withAuth(Notification)
