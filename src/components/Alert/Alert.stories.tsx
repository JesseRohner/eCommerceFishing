import { ComponentMeta, ComponentStory } from "@storybook/react"

import Alert from "./Alert.component"

export default {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    type: {
      control: "select",
      options: ["danger", "info"],
      defaultValue: "danger",
    },
    hideIcon: {
      control: "boolean",
      defaultValue: false,
    },
    iconPosition: {
      control: "select",
      options: ["center", "start", "end"],
    },
  },
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = (args) => (
  <Alert {...args}>
    Sorry, that email or password doesn’t match our records. Please try again.
    Forgotten password?
  </Alert>
)

export const Danger = Template.bind({})

Danger.args = {
  type: "danger",
}

export const Info = Template.bind({})

Info.args = {
  type: "info",
}
