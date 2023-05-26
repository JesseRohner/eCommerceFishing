import { ComponentMeta, ComponentStory } from "@storybook/react"

import Checkbox from "./Checkbox.component"

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    shape: {
      control: "select",
      options: ["squircle", "circle"],
      defaultValue: "squircle",
    },
    size: {
      control: "select",
      options: ["md", "md-2"],
      defaultValue: "md",
    },
    isDisabled: {
      control: "boolean",
      defaultValue: false,
    },
    isReadonly: {
      control: "boolean",
      defaultValue: false,
    },
    isThreeState: {
      control: "boolean",
      defaultValue: false,
    },
    checked: {
      control: "select",
      options: [true, false, null],
    },
    label: {
      control: "text",
      defaultValue: "",
    },
    helperText: {
      control: "text",
      defaultValue: "",
    },
    onChange: {
      action: "changed",
    },
  },

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = ({ ...args }) => (
  <Checkbox {...args} id="checkbox-story" />
)

export const DefaultSquircle = Template.bind({})

export const DefaultCircle = Template.bind({})

DefaultCircle.args = {
  shape: "circle",
}

export const Checked = Template.bind({})

Checked.args = {
  checked: true,
}

export const Indeterminate = Template.bind({})

Indeterminate.args = {
  checked: null,
  isThreeState: true,
}

export const WithLabel = Template.bind({})

WithLabel.args = {
  label: "Label",
}

export const WithLabelAppend = Template.bind({})

WithLabelAppend.args = {
  label: "Label",
  labelAppend: <span className="bg-green-500">Append Element</span>,
}

export const WithLabelAndHelperText = Template.bind({})

WithLabelAndHelperText.args = {
  label: "Transactional Account Emails",
  helperText: "Helper text",
}
