import { ComponentMeta, ComponentStory } from "@storybook/react"

import Navigation from "./Navigation.module"

export default {
  title: "Modules/Navigation",
  component: Navigation,

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Navigation>

const Template: ComponentStory<typeof Navigation> = (args) => (
  <Navigation {...args} />
)

export const Default = Template.bind({})

Default.args = {}
