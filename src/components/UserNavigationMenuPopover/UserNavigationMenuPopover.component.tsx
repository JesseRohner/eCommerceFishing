import cx from "classnames"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { ArrowContainer, Popover } from "react-tiny-popover"

import Button, { ButtonProps } from "@components/Button"
import UserCard from "@components/UserCard"

import useAuth from "@services/Auth/Auth.context"

import BellIcon from "@public/icons/bell.svg"
import EditIcon from "@public/icons/edit.svg"
import HelpIcon from "@public/icons/help.svg"
import LogoutIcon from "@public/icons/log-out.svg"

export type UserNavigationMenuContentProps = {
  styleFor: UserNavigationMenuPopoverProps["styleFor"]

  hidePopover: () => void
}

const buttonProps: Pick<ButtonProps, "shape" | "colourScheme" | "className"> = {
  shape: "rectangle-2",
  colourScheme: "white",
  className: "!font-medium w-full !h-[44px] [&>div]:mr-auto",
}

export const UserNavigationMenuContent: React.FC<
  UserNavigationMenuContentProps
> = ({ styleFor, hidePopover }) => {
  const router = useRouter()
  const { logout } = useAuth()

  return (
    <div
      className={cx(
        "bg-white rounded-lg overflow-hidden shadow-[0px_2px_12px_rgba(0,0,0,0.24)]",
        {
          "w-[280px]": styleFor === "desktop-navigation",
          "w-full": styleFor === "mobile-navigation",

          "mb-[7px]": styleFor === "desktop-navigation",
        },
      )}
    >
      <UserCard
        variant="compact-2"
        colourScheme="white"
        className="!py-[14px] hover:bg-transparent"
      />

      <Button
        onClick={() => {
          router.push("/settings/billing")

          hidePopover()
        }}
        className={cx("w-full rounded-none", {
          "!h-9": styleFor === "desktop-navigation",
        })}
        noVerticalPadding
      >
        Upgrade to premium
      </Button>

      <Button
        leftIcon={<EditIcon className="w-6 h-6 fill-blue-600 mr-3" />}
        onClick={() => {
          router.push("/settings/edit-profile")

          hidePopover()
        }}
        {...buttonProps}
      >
        Edit Profile
      </Button>

      <Button
        leftIcon={<BellIcon className="w-6 h-6 fill-blue-600 mr-3" />}
        onClick={() => {
          router.push("/settings/notifications")

          hidePopover()
        }}
        {...buttonProps}
      >
        Notifications
      </Button>

      <Button
        leftIcon={<HelpIcon className="w-6 h-6 fill-blue-600 mr-3" />}
        onClick={() => {
          window.open("https://help.pfnexus.com")

          hidePopover()
        }}
        {...buttonProps}
      >
        Help
      </Button>

      <div className="w-full h-px bg-blue-300" />

      <Button
        leftIcon={<LogoutIcon className="w-6 h-6 fill-blue-600 mr-3" />}
        onClick={logout}
        {...buttonProps}
      >
        Log out
      </Button>
    </div>
  )
}

export type UserNavigationMenuPopoverProps = {
  styleFor?: "mobile-navigation" | "desktop-navigation"

  children: (args: { toggle: () => void }) => React.ReactElement
}

const UserNavigationMenuPopover: React.FC<UserNavigationMenuPopoverProps> = ({
  styleFor = "desktop-navigation",

  children,
}) => {
  const { isAuthValid } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const hidePopoverCallback = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isAuthValid()) {
      hidePopoverCallback()
    }
  }, [isAuthValid()])

  return (
    <Popover
      isOpen={isOpen}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor="white"
          arrowSize={10}
          arrowClassName={cx({ "-mt-2": styleFor === "desktop-navigation" })}
        >
          <UserNavigationMenuContent
            styleFor={styleFor}
            hidePopover={hidePopoverCallback}
          />
        </ArrowContainer>
      )}
      align="end"
      positions={styleFor === "desktop-navigation" ? ["right"] : ["bottom"]}
      padding={styleFor === "mobile-navigation" ? 4 : 0}
      containerClassName={cx({
        "-ml-[10px]": styleFor === "desktop-navigation",
      })}
      onClickOutside={hidePopoverCallback}
    >
      {children({
        toggle: () => {
          setIsOpen((prevState) => !prevState)
        },
      })}
    </Popover>
  )
}

export default UserNavigationMenuPopover
