import { show } from "@services/ModalManager"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import ConfirmEmail from "./ConfirmEmail.component"

export default {
  title: "Modals/ConfirmEmail",
  component: ConfirmEmail,

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof ConfirmEmail>

const Template: ComponentStory<typeof ConfirmEmail> = () => {
  return (
    // @ts-ignore
    <button onClick={() => show(ConfirmEmail)}>Open Modal</button>
  )
}

export const Default = Template.bind({})
