import { ComponentMeta, ComponentStory } from "@storybook/react"

import Badge from "./Badge.component"

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    value: {
      control: "text",
    },
    shape: {
      control: "select",
      options: ["squircle", "circle"],
      defaultValue: "squircle",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      defaultValue: "sm",
    },
  },

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Badge>

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />

export const SquircleSmall = Template.bind({})

SquircleSmall.args = {
  value: "Upgrade",
  shape: "squircle",
  size: "sm",
}

export const SquircleMedium = Template.bind({})

SquircleMedium.args = {
  value: "Upgrade",
  shape: "squircle",
  size: "md",
}

export const SquircleLarge = Template.bind({})

SquircleLarge.args = {
  value: "Upgrade",
  shape: "squircle",
  size: "lg",
}

export const CircleSmall = Template.bind({})

CircleSmall.args = {
  value: "Upgrade",
  shape: "circle",
  size: "sm",
}

export const CircleMedium = Template.bind({})

CircleMedium.args = {
  value: "Upgrade",
  shape: "circle",
  size: "md",
}

export const CircleLarge = Template.bind({})

CircleLarge.args = {
  value: "Upgrade",
  shape: "circle",
  size: "lg",
}
