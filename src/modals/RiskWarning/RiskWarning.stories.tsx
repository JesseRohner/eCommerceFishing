import { show } from "@services/ModalManager"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import RiskWarning from "./RiskWarning.component"

export default {
  title: "Modals/RiskWarning",
  component: RiskWarning,

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof RiskWarning>

const Template: ComponentStory<typeof RiskWarning> = () => (
  // @ts-ignore
  <button onClick={() => show(RiskWarning)}>Open Modal</button>
)

export const Default = Template.bind({})
