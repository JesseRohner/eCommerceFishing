import { ComponentMeta, ComponentStory } from "@storybook/react"

import HomeStatDisplay from "./HomeStatDisplay.component"

export default {
  title: "Components/HomeStatDisplay",
  component: HomeStatDisplay,
  argTypes: {
    label: { type: "string", defaultValue: "Total project Value Listed" },
    tooltipContent: {
      type: "string",
      defaultValue: "default info tooltip message",
    },
    value: { type: "string", defaultValue: "$1,089.0m" },
    colourScheme: {
      control: "select",
      options: ["gray", "green", "dark-blue"],
      defaultValue: "gray",
    },
  },

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof HomeStatDisplay>

const Template: ComponentStory<typeof HomeStatDisplay> = (args) => (
  <div className="w-[270px]">
    <HomeStatDisplay {...args} />
  </div>
)

export const Default = Template.bind({})
