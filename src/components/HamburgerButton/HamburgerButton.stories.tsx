import { ComponentMeta, ComponentStory } from "@storybook/react"

import HamburgerButton from "./HamburgerButton.component"

export default {
  title: "Components/HamburgerButton",
  component: HamburgerButton,
  argTypes: { onClick: { action: "clicked" } },

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof HamburgerButton>

const Template: ComponentStory<typeof HamburgerButton> = (args) => (
  <HamburgerButton {...args} />
)

export const Default = Template.bind({})
