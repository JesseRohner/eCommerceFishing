import { ComponentMeta, ComponentStory } from "@storybook/react"

import SignUpToAccess from "./SignUpToAccess.component"

export default {
  title: "Disclaimers/SignUpToAccess",
  component: SignUpToAccess,
  argTypes: {
    hasNoDefaultSpacing: {
      control: "boolean",
      defaultValue: false,
    },
    hasNoDefaultMaxWidth: {
      control: "boolean",
      defaultValue: false,
    },
    hasNoMobileDefaultMaxWidth: {
      control: "boolean",
      defaultValue: false,
    },
    isDefaultIconHidden: {
      control: "boolean",
      defaultValue: false,
    },

    overrideDefaultActionOnClick: {
      control: "boolean",
      defaultValue: false,
    },
    overrideDefaultSecondaryActionOnClick: {
      control: "boolean",
      defaultValue: false,
    },

    actionButtonText: {
      control: "text",
      defaultValue: "",
    },
    secondaryActionButtonText: {
      control: "text",
      defaultValue: "",
    },

    onActionClick: {
      control: "action",
    },
    onSecondaryActionClick: {
      control: "action",
    },

    className: {
      control: "text",
      defaultValue: "",
    },
  },
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof SignUpToAccess>

const Template: ComponentStory<typeof SignUpToAccess> = (args) => (
  <div className="bg-blue-100 p-16">
    <SignUpToAccess {...args} />
  </div>
)

export const Default = Template.bind({})

export const WithoutDefaultIcon = Template.bind({})

WithoutDefaultIcon.args = {
  isDefaultIconHidden: true,
}
