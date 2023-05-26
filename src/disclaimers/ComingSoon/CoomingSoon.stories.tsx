import { ComponentMeta, ComponentStory } from "@storybook/react"

import ComingSoon from "./ComingSoon.component"

export default {
  title: "Disclaimers/ComingSoon",
  component: ComingSoon,
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
    heading: {
      control: "text",
      defaultValue: "Coming soon",
    },
    description: {
      control: "text",
      defaultValue:
        "What would you like to see in 'Projects'? Tell us by clicking the button below.",
    },
    feedbackUrl: {
      control: "text",
      defaultValue: "https://google.com/",
    },
    className: {
      control: "text",
      defaultValue: "",
    },
  },

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof ComingSoon>

const Template: ComponentStory<typeof ComingSoon> = (args) => (
  <div className="bg-blue-100 p-16">
    <ComingSoon {...args} />
  </div>
)

export const Default = Template.bind({})

export const WithoutDefaultIcon = Template.bind({})

WithoutDefaultIcon.args = {
  isDefaultIconHidden: true,
}

export const WithoutHeading = Template.bind({})

WithoutHeading.args = {
  heading: "",
}

export const WithoutDescription = Template.bind({})

WithoutDescription.args = {
  description: "",
}

export const WithoutFeedbackUrl = Template.bind({})

WithoutFeedbackUrl.args = {
  feedbackUrl: "",
}
