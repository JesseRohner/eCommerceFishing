import { ComponentMeta, ComponentStory } from "@storybook/react"

import Dropdown from "./Dropdown.component"

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {},

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = () => (
  <div className="w-[250px]">
    <Dropdown
      options={[...new Array(50).fill(undefined).map((_, i) => i.toString())]}
    />
  </div>
)

export const Default = Template.bind({})
