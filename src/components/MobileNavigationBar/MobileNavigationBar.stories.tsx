import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import MobileNavigationBar from "./MobileNavigationBar.component"

export default {
  title: "Components/MobileNavigationBar",
  component: MobileNavigationBar,
  argTypes: { onHamburgerClick: { action: "clicked" } },

  parameters: {
    layout: "full",
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone12",
    },
  },
} as ComponentMeta<typeof MobileNavigationBar>

const Template: ComponentStory<typeof MobileNavigationBar> = (args) => (
  <div className="bg-blue-100 p-5">
    <MobileNavigationBar {...args} />
  </div>
)

export const Default = Template.bind({})

Default.args = {}
