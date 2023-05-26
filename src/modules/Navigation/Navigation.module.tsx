import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { forwardRef, useState } from "react"
import { FormattedMessage } from "react-intl"

import LogoLink from "@components/LogoLink"
import NavigationItem from "@components/NavigationItem"
import UserCard from "@components/UserCard"
import UserNavigationMenuPopover from "@components/UserNavigationMenuPopover"

import { NAVIGATION_ITEMS } from "./Navigation.constants"

const Navigation = forwardRef<HTMLElement>((_props, ref) => {
  const { pathname, asPath, query, ...router } = useRouter()
  const [isSubNavigationShown, setIsSubNavigationShown] = useState<{
    [k in string]: boolean
  }>({})

  const handleItemWithSubItemsClick = (itemId: string) => {
    setIsSubNavigationShown((oldState) => ({
      ...oldState,
      [itemId]:
        typeof isSubNavigationShown[itemId] === "undefined" ||
        !isSubNavigationShown[itemId],
    }))
  }

  return (
    <aside
      ref={ref}
      data-testid="navigation"
      className="fixed sm:static flex flex-col w-[calc(100%-72px)] sm:w-56 h-screen bg-blue-900 leading-6 z-20"
    >
      {/* Logo - Start */}
      <LogoLink type="dark" hasSpacing hideOnMobile />
      {/* Logo - End */}

      {/* Navigation Items - Start */}
      <div className="flex-1 overflow-auto pt-3 sm:pt-0">
        <nav className="space-y-5 text-blue-400">
          {NAVIGATION_ITEMS.map(({ header, items }) => (
            <section key={header.id}>
              <header className="px-5 uppercase text-[11px] tracking-wide text-opacity-75 text-blue-400">
                <FormattedMessage {...header} />
              </header>

              <ul className="flex flex-col text-sm font-medium px-2">
                {items.map(({ subItems, ...item }) => (
                  <li key={item.label.id}>
                    <NavigationItem
                      state={asPath === item.href ? "active" : "normal"}
                      hasChevron={Boolean(subItems?.length)}
                      hasChevronFlipped={isSubNavigationShown[item.label.id!]}
                      onClick={
                        !item.href
                          ? () => handleItemWithSubItemsClick(item.label.id!)
                          : undefined
                      }
                      {...item}
                    />

                    {subItems?.length && (
                      <motion.ul
                        className="overflow-hidden"
                        initial="collapsed"
                        animate={
                          isSubNavigationShown[item.label.id!]
                            ? "open"
                            : "collapsed"
                        }
                        exit="collapsed"
                        transition={{ type: "tween" }}
                        variants={{
                          open: { height: "auto" },
                          collapsed: { height: 0 },
                        }}
                      >
                        {subItems.map((subItem) => (
                          <li key={subItem.label.id}>
                            <NavigationItem
                              variant="compact"
                              state={
                                (
                                  subItem.matchStr
                                    ? query["r.from"] === subItem.matchStr
                                    : !query["r.from"] &&
                                      pathname === subItem.href
                                )
                                  ? "active"
                                  : "normal"
                              }
                              {...subItem}
                            />
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </div>
      {/* Navigation Items - End */}

      {/* User profile - Start */}
      <UserNavigationMenuPopover>
        {({ toggle }) => (
          <UserCard
            borderStyle="top"
            onClick={toggle}
            isBordered
            displayBadge
          />
        )}
      </UserNavigationMenuPopover>
      {/* User profile - End */}
    </aside>
  )
})

export default motion(Navigation)
