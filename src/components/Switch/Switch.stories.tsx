import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useEffect, useState } from "react"

import Switch from "./Switch.component"

export default {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    checked: {
      control: { type: "boolean" },
      defaultValue: true,
    },
    isDisabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
  },
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => {
  const [checked, setChecked] = useState(args.checked)

  useEffect(() => {
    setChecked(args.checked)
  }, [args.checked])

  return (
    <div>
      <Switch
        {...args}
        checked={checked}
        onClick={() => setChecked(!checked)}
      />
    </div>
  )
}

export const DefaultSelected = Template.bind({})

DefaultSelected.args = {
  checked: true,
  isDisabled: false,
}

export const DefaultUnselected = Template.bind({})
DefaultUnselected.args = {
  checked: false,
  isDisabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  checked: true,
  isDisabled: true,
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  checked: true,
  label: "Automated reminders",
  isDisabled: false,
}

export const WithDescription = Template.bind({})
WithDescription.args = {
  checked: true,
  description:
    "In platform tips that help you get the most out of your experience",
  isDisabled: false,
}

export const WithLabelAndDescription = Template.bind({})
WithLabelAndDescription.args = {
  checked: true,
  label: "Automated reminders",
  description:
    "In platform tips that help you get the most out of your experience",
  isDisabled: false,
}
