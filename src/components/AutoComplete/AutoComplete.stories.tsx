import { ComponentMeta, ComponentStory } from "@storybook/react"

import AutoComplete from "./AutoComplete.component"

const data = [
  {
    id: 1,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 2,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 3,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 4,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 5,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 6,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 7,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 8,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets ",
  },
  {
    id: 9,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 10,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 11,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 12,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 13,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 14,
    icon: "image",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
]

export default {
  title: "Components/AutoComplete",
  component: AutoComplete,

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof AutoComplete>

const Template: ComponentStory<typeof AutoComplete> = (args) => (
  <AutoComplete {...args} />
)

export const Default = Template.bind({})

Default.args = {
  data: data,
}
