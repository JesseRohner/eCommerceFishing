import Avatar from "@components/Avatar"
import HamburgerButton from "@components/HamburgerButton"
import LogoLink from "@components/LogoLink"
import UserNavigationMenuPopover from "@components/UserNavigationMenuPopover"

import useAuth from "@services/Auth/Auth.context"

type MobileNavigationBarProps = {
  onHamburgerClick: React.MouseEventHandler<HTMLButtonElement>
}

const MobileNavigationBar: React.FC<MobileNavigationBarProps> = ({
  onHamburgerClick,
}) => {
  const { isAuthValid, user } = useAuth()

  const userInitials = [
    (user.firstname || "")[0],
    (user.lastname || "")[0],
  ].join("")

  return (
    <nav
      data-testid="navigation-mobile"
      className="block sm:hidden w-full bg-white leading-6"
    >
      <div className="flex justify-between h-14 px-4 py-[10px]">
        <div className="flex items-center">
          <HamburgerButton className="-ml-1" onClick={onHamburgerClick} />

          <div className="flex ml-3">
            <LogoLink type="light" hasSpacing={false} />
          </div>
        </div>

        {isAuthValid() && (
          <UserNavigationMenuPopover styleFor="mobile-navigation">
            {({ toggle }) => <Avatar value={userInitials} onClick={toggle} />}
          </UserNavigationMenuPopover>
        )}
      </div>
    </nav>
  )
}

export default MobileNavigationBar
