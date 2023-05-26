import { ComponentMeta, ComponentStory } from "@storybook/react"

import Avatar from "./Avatar.component"

export default {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: "select",
      options: ["md", "xl"],
      defaultValue: "md",
    },
    value: {
      control: "text",
      defaultValue: "HR",
    },
    className: {
      control: "text",
    },
  },

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Medium = Template.bind({})

Medium.args = {
  size: "md",
}

export const ExtraLarge = Template.bind({})

ExtraLarge.args = {
  size: "xl",
}
