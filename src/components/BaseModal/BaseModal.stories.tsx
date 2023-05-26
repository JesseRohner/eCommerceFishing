import Input from "@components/Input"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import BaseModal from "./BaseModal.component"

export default {
  title: "Components/BaseModal",
  component: BaseModal,

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof BaseModal>

const Template: ComponentStory<typeof BaseModal> = (args) => (
  <BaseModal {...args}>
    <div className="py-6">
      <Input id="email" size="md" className="w-full" labelText="Email" />
    </div>
  </BaseModal>
)

export const Default = Template.bind({})

Default.args = {
  title: "Login",
}
