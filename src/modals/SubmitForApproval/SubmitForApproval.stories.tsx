import { ComponentMeta, ComponentStory } from "@storybook/react"

import { show } from "@services/ModalManager"

import SubmitForApproval from "./SubmitForApproval.component"

export default {
  title: "Modals/SubmitForApproval",
  component: SubmitForApproval,

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof SubmitForApproval>

const Template: ComponentStory<typeof SubmitForApproval> = () => {
  return (
    // @ts-ignore
    <button onClick={() => show(SubmitForApproval)}>Open Modal</button>
  )
}

export const Default = Template.bind({})
