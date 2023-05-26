import { show } from "@services/ModalManager"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import Registration from "./Registration.component"

export default {
  title: "Modals/Registration",
  component: Registration,

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Registration>

const Template: ComponentStory<typeof Registration> = () => (
  // @ts-ignore
  <button onClick={() => show(Registration)}>Open Modal</button>
)

export const Default = Template.bind({})
