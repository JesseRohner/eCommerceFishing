import { ComponentMeta, ComponentStory } from "@storybook/react"

import { show } from "@services/ModalManager"

import EmailVerification from "./EmailVerification.component"

export default {
  title: "Modals/EmailVerification",
  component: EmailVerification,

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof EmailVerification>

const Template: ComponentStory<typeof EmailVerification> = () => {
  return (
    // @ts-ignore
    <button onClick={() => show(EmailVerification)}>Open Modal</button>
  )
}

export const Default = Template.bind({})
