import { show } from "@services/ModalManager"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import CreateCompany from "./CreateCompany.component"

export default {
  title: "Modals/CreateCompany",
  component: CreateCompany,

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof CreateCompany>

const Template: ComponentStory<typeof CreateCompany> = () => (
  // @ts-ignore
  <button onClick={() => show(CreateCompany)}>Open Modal</button>
)

export const Default = Template.bind({})
