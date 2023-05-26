import { ComponentMeta, ComponentStory } from "@storybook/react"

import LogoLink from "./LogoLink.component"

export default {
  title: "Components/LogoLink",
  component: LogoLink,
  argTypes: {
    type: {
      options: ["light", "dark"],
      control: { type: "radio" },
    },
  },

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof LogoLink>

const Template: ComponentStory<typeof LogoLink> = (args) => (
  <div>
    <LogoLink {...args} />
  </div>
)

const TemplateDark: ComponentStory<typeof LogoLink> = (args) => (
  <div className="bg-blue-800">
    <LogoLink {...args} />
  </div>
)

export const Default = Template.bind({})

Default.args = {
  type: "light",
  hasSpacing: false,
  hideOnMobile: false,
}

export const Dark = TemplateDark.bind({})

Dark.args = {
  type: "dark",
  hasSpacing: true,
  hideOnMobile: false,
}
