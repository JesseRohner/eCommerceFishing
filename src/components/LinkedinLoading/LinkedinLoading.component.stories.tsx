import { ComponentMeta, ComponentStory } from "@storybook/react"

import LinkedinLoading from "./LinkedinLoading.component"

export default {
  title: "Components/LinkedinLoading",
  component: LinkedinLoading,

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof LinkedinLoading>

const Template: ComponentStory<typeof LinkedinLoading> = (args) => (
  <LinkedinLoading {...args} />
)

export const Default = Template.bind({})
