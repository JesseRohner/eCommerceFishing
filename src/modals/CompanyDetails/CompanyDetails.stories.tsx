import { show } from "@services/ModalManager"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import CompanyDetails from "./CompanyDetails.component"

export default {
  title: "Modals/CompanyDetails",
  component: CompanyDetails,

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof CompanyDetails>

const data = [
  {
    id: 1,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 2,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 3,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 4,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 5,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 6,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 7,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 8,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets ",
  },
  {
    id: 9,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 10,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 11,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "3i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 12,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "233i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 13,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "223i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
  {
    id: 14,
    icon: "https://img.favpng.com/24/10/2/google-png-png-favpng-P8yU3059rcgM6WPT085s8sqTc.jpg",
    title: "23i Infrastructure",
    description:
      "DEVELOPER • FTSE 250-listed investment company focused on economic infrastructure in developed markets",
  },
]

const Template: ComponentStory<typeof CompanyDetails> = () => {
  return (
    // @ts-ignore
    <button onClick={() => show(CompanyDetails, { data: data })}>
      Open Modal
    </button>
  )
}

export const Default = Template.bind({})
