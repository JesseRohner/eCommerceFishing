import { useMediaQuery } from "@react-hook/media-query"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import MobileNavigationBar from "@components/MobileNavigationBar"

import Navigation from "@modules/Navigation"

const Default: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isNavigationShown, setIsNavigationShown] = useState(false)
  const aboveBreakpointSM = useMediaQuery("(min-width: 640px)")

  useEffect(() => {
    setIsNavigationShown(false)
  }, [aboveBreakpointSM])

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <div>
          {/* Mobile Navigation Overlay - Start */}
          <motion.div
            data-testid="navigation-overlay"
            className="fixed w-screen h-screen bg-blue-600 bg-opacity-60 z-10"
            initial="hidden"
            animate={isNavigationShown ? "shown" : "hidden"}
            exit="hidden"
            transition={{ duration: 0.2 }}
            variants={{
              shown: { opacity: 1, display: "block" },
              hidden: { opacity: 0, display: "none" },
            }}
            onClick={() => {
              setIsNavigationShown(false)
            }}
          />
          {/* Mobile Navigation Overlay - End */}

          {/* Navigation Sidebar - Start */}
          <Navigation
            key="navigation-sidebar"
            initial="shown"
            animate={isNavigationShown ? "shown" : "hidden"}
            exit="hidden"
            transition={{ type: "tween" }}
            variants={{
              shown: { left: 0 },
              hidden: { left: "-100%" },
            }}
          />
          {/* Navigation Sidebar - End */}
        </div>

        <div className="flex flex-1 flex-col w-full overflow-auto">
          <div className="flex">
            {/* Mobile Top Navigation - Start */}
            <MobileNavigationBar
              onHamburgerClick={() => {
                setIsNavigationShown(true)
              }}
            />
            {/* Mobile Top Navigation - End */}
          </div>

          {/* Main Content - Start */}
          <div className="flex flex-col flex-1 bg-blue-100 overflow-y-auto">
            {children}
          </div>
          {/* Main Content - End */}

          <div id="fixed-bottom" className="flex" />
        </div>
      </div>
    </div>
  )
}

export default Default
